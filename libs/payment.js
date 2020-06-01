const config = require('./config');
const stripe = require('stripe')(config.getStripeKeys().secret_key);
const express = require('express');
const db = require('./db');
const router = express.Router();
const uuid = require('uuid');

// token --> {email, name, fund_id, amount, stripe_customer_id, ...}
const pledgeTokens = {};

router.get('/stripe_publishable_key', (req, res) => {
    res.json({key: config.getStripeKeys().publishable_key});
});

router.post('/pledge', async (req, res) => {
    try{
        const { email, name, fund_id, amount } = req.body;
        const customer = await stripe.customers.create({
            email,
            name,
            metadata: { 
                fund_id,
                dateTime: new Date().toISOString()
            }
        });

        const intent = await stripe.setupIntents.create({
            customer: customer.id,
        });

        const token = uuid.v4();
        pledgeTokens[token] = {
            email, name, fund_id, amount, stripe_customer_id: customer.id
        };
        setTimeout(() => {
            delete(pledgeTokens[token]);
        }, 1000 * 60 * 10);

        res.json({client_secret: intent.client_secret, token});
    }catch(e){
        res.json({error: e.message});
    }
});

router.post('/pledge/commit', (req, res) => {
    const { token } = req.body;
    const pledge = pledgeTokens[token];
    if (!pledge){
        res.json({error: "Invalid pledge token."});
        return;
    }

    try{
        db.addPledge(pledge);
        delete(pledgeTokens[token]);
    }catch(e){
        res.json({error: e.message});
    }
});

module.exports = {
    api: router
}

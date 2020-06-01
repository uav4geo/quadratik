const config = require('./config');
const stripe = require('stripe')(config.getStripeKeys().secret_key);
const express = require('express');
const router = express.Router();

router.get('/pledge', async (req, res) => {
    const customer = await stripe.customers.create();
});

router.get('/stripe_publishable_key', (req, res) => {
    res.json({key: config.getStripeKeys().publishable_key});
});

router.post('/pledge', async (req, res) => {
    try{
        const { email, name, fundId } = req.body;
        const customer = await stripe.customers.create({
            email,
            name,
            metadata: { 
                fundId,
                dateTime: new Date().toISOString()
            }
        });

        res.json({client_secret: paymentIntent.client_secret});
    }catch(e){
        res.json({error: e.message});
    }
});

module.exports = {
    api: router
}

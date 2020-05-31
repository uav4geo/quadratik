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

router.post('/pledge/intent', async (req, res) => {
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: {integration_check: 'accept_a_payment'},
        });
    
        res.json({client_secret: paymentIntent.client_secret});
    }catch(e){
        res.json({error: e.message});
    }
});

module.exports = {
    api: router
}

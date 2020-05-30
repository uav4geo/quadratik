const config = require('./config');
const stripe = require('stripe')(config.getStripeKey());
const express = require('express');
const router = express.Router();

router.get('/pledge', async (req, res) => {
    const customer = await stripe.customers.create();
});

module.exports = {
    api: router
}

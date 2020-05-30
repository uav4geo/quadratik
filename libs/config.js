const db = require('./db');

module.exports = {
    get: function(key){
        return (db.fetchOne('SELECT value FROM config WHERE key = ?', key) || {}).value;
    },

    isTestMode: function(){
        return this.get("is_live") !== "true";
    },

    getStripeKey(){
        if (this.isTestMode()) return this.get('stripe_test_key');
        else return this.get('stripe_live_key');
    }
}

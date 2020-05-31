const db = require('./db');

module.exports = {
    get: function(key){
        return (db.fetchOne('SELECT value FROM config WHERE key = ?', key) || {}).value;
    },

    isTestMode: function(){
        return this.get("is_live") !== "true";
    },

    getStripeKeys(){
        let type = this.isTestMode() ? 'test' : 'live';
        return db.fetchOne(`SELECT a.value AS secret_key, b.value as publishable_key FROM config a 
                            JOIN config b
                            WHERE a.key = 'stripe_${type}_secret_key' AND b.key='stripe_${type}_publishable_key'`);
    }
}

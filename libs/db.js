const PouchDB = require('pouchdb');
const DataPouchDB = PouchDB.defaults({prefix: 'data/'});
const pouchRouter = require('express-pouchdb');

let funds = null;

const setReadOnly = async db => {
    try{
        await db.get('_design/auth');
    }catch(_){
        console.log(`Setting ${db.name} to read only`);
        await db.put({
            _id: '_design/auth',
            language: "javascript",
            validate_doc_update: `
            function(newDoc, oldDoc, userCtx) { 
                if (userCtx.roles.indexOf('_admin') === -1) { 
                    throw ({ forbidden: 'Forbidden' }); 
                }
            }
            `.replace("\n", "")
        });
    }
}

module.exports = {
    initialize: async app => {
        const pouchHandle = pouchRouter(DataPouchDB);
        funds = new DataPouchDB('funds');

        await setReadOnly(funds);

        app.use("/", pouchHandle);
    }
}

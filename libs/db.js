const db = require('better-sqlite3')('data/sqlite3.db', {});
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const migFile = path.join("data", "migrated.txt");
if (!fs.existsSync(migFile)){
    fs.writeFileSync(migFile, JSON.stringify({currentMigration: -1}), 'utf8');
}
let { currentMigration } = JSON.parse(fs.readFileSync(migFile, 'utf8'));

const migrations = fs.readdirSync("migrations").sort();
migrations.forEach(m => {
    const n = parseInt(m.substr(0, 4));
    if (currentMigration < n){
        console.log(`Executing ${m}...`);
        db.exec(fs.readFileSync(path.join("migrations", m), 'utf8'));
        currentMigration = n;
        fs.writeFileSync(migFile, JSON.stringify({currentMigration}), 'utf8');
    }
});

router.get("/funds", (req, res) => {
    res.json(db.prepare(`
    SELECT f.*,
    CASE COUNT(p.id)
        WHEN 0 THEN json_array()
        ELSE json_group_array(json_object('amount', p.amount, 'name', p.name))
    END as pledges
    FROM funds f
    LEFT OUTER JOIN pledges p
    ON p.fund_id = f.id
    GROUP BY f.id`).all().map(r => (r.pledges = JSON.parse(r.pledges), r)));
});

module.exports = {
    api: router,
    fetchOne: function(query, ...params){
        return db.prepare(query).get(...params);
    },

    addPledge: function(pledge){
        const stmt = db.prepare(`INSERT INTO pledges
        VALUES (@amount, @name, @email, @fund_id, @stripe_customer_id)`);
        stmt.run(pledge);
    }
}

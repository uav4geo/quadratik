CREATE TABLE IF NOT EXISTS "funds" (
    "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"title"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"goal"	REAL NOT NULL,
	"url"	TEXT,
    "expires"	TEXT,
    "sponsor_name"	TEXT,
	"sponsor_url"	TEXT,
	"developer_name"	TEXT,
	"developer_url"	TEXT,
    "type"	INTEGER DEFAULT 1,
    "payments_processed"	INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "pledges" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"amount"	REAL NOT NULL,
	"name"	TEXT DEFAULT "",
	"email"	TEXT DEFAULT "",
    "fund_id"	INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "fund_id_fk" ON "pledges" (
	"fund_id"
);

CREATE TABLE IF NOT EXISTS "config" (
	"key"	TEXT,
	"value"	TEXT,
	PRIMARY KEY("key")
);
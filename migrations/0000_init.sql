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
    "funding_type"	INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "pledges" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"amount"	REAL NOT NULL,
	"name"	TEXT DEFAULT "",
	"email"	TEXT DEFAULT "",
    "fund_id"	INTEGER NOT NULL
);

CREATE INDEX "fund_id_fk" ON "pledges" (
	"fund_id"
);
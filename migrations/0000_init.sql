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
	"developer_url"	TEXT
);
migration.up = function(db) {
	db.createTable("Fugitive",
		{
		    "columns": {
				"name": "string",
				"captured": "integer",
				"url": "String" ,
				"capturedLat": "real",
				"capturedLong": "real"
		    },
		    "defaults": {},
		    "adapter": {
		        "type": "sql",
		        "tablename": "Fugitive"
		    }
		}
	);
};

migration.down = function(db) {
	db.dropTable("Fugitive");
};

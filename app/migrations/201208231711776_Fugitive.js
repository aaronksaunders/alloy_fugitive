migration.up = function(db) {
    db.createTable({
        "columns" : {
            "name" : "string",
            "captured" : "integer",
            "url" : "String",
            "capturedLat" : "real",
            "capturedLong" : "real"
        },
        "adapter" : {
            "type" : "sql",
            "collection_name" : "fugitives"
        }
    });
};

migration.down = function(db) {
    db.dropTable("fugitives");
};

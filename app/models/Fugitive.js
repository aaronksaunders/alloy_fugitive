exports.definition = {

    config : {
        "columns" : {
            "name" : "string",
            "captured" : "integer",
            "url" : "string",
            "capturedLat" : "real",
            "capturedLong" : "real"
        },
        "defaults" : {
            "name" : "",
            "captured" : 0,
            "url" : "",
            "capturedLat" : "",
            "capturedLong" : ""
        },
        "adapter" : {
            "type" : "sql",
            "collection_name" : "fugitives"
        }
    },

    extendModel : function(Model) {
        _.extend(Model.prototype, {

        });
        // end extend

        return Model;
    },

    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {

        });
        // end extend

        return Collection;
    }
}
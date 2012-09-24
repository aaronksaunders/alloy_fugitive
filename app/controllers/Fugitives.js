// ..
// PRIVATE FUNCTIONS
//
/**
 *
 */
function populateData() {

	var fugitiveCollection = Alloy.createCollection("Fugitive");

	// update the table here
	fugitiveCollection.on("fetch", function() {
		Ti.API.info(" users..." + JSON.stringify(fugitiveCollection));

		var rows = [];
		$.table.setData([]);
		for (var i = 0; i < fugitiveCollection.length; i++) {
			var model = fugitiveCollection.at(i);
			var row = Alloy.createController('FugitiveRow', model.toJSON()).getView();
			row.model = model;
			rows.push(row);
		}
		$.table.setData(rows);
		Ti.API.debug("set table data");

	});

	// get the data
	fugitiveCollection.fetch({
		data : {
			"captured" : "true"
		},
		success : function(collection, response) {
			Ti.API.info("success " + JSON.stringify(collection));
		},
		error : function(collection, response) {
			Ti.API.error("error " + JSON.stringify(collection));
		}
	});

}

/**
 *
 */
function addNewFugitive() {
	var addFugitiveController = Alloy.createController('FugitiveAdd', {
		parent : $
	});
	$.fugitiveTab.open(addFugitiveController.getView());
}

//
// EVENT LISTENERS
//
$.table.addEventListener('click', function(_e) {
	var detailController = Alloy.createController('FugitiveDetail', {
		parent : $,
		data : _e.rowData.model
	});
	$.fugitiveTab.open(detailController.getView());
});

// force table update
$.on('update_table', populateData);

// force tables to update
Ti.App.addEventListener('update_table', function() {
	populateData();
});

//
// INITIALIZERS
//
// add the add button, this can be refactored
if (Ti.Platform.osname === 'iphone') {
	$.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
	$.add.addEventListener('click', addNewFugitive);
	$.fugitiveWindow.setRightNavButton($.add);
}

//run initial query
populateData();

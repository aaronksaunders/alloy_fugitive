// ..
// PRIVATE FUNCTIONS
//
/**
 *
 */
function populateData() {

	var fugitiveCollection = Alloy.createCollection("Fugitive");

	// update the table here
	function populateData() {

		var fugitiveCollection = Alloy.createCollection("Fugitive");

		// update the table here
		fugitiveCollection.on("fetch", function() {
			// filter the collection
			var atLargeCollection = fugitiveCollection.where({
				captured : 0
			});
			Ti.API.info(" users..." + JSON.stringify(fugitiveCollection));

			var rows = [];
			// clear the table
			$.table.setData([]);

			// loop throu collection and add them to table
			for (var i = 0; i < atLargeCollection.length; i++) {
				var model = atLargeCollection[i];
				var row = Alloy.createController('FugitiveRow', model.toJSON()).getView();
				row.model = model;
				rows.push(row);
			}

			// set the table
			$.table.setData(rows);

		});

		// get the data
		fugitiveCollection.fetch();

	}

/**
 *
 */
function addNewFugitive() {
	var addFugitiveController = Alloy.createController('FugitiveAdd');
	$.fugitiveTab.open(addFugitiveController.getView());
}

//
// EVENT LISTENERS
//
$.table.addEventListener('click', function(_e) {
	var detailController = Alloy.createController('FugitiveDetail', {
		parentTab : $.fugitiveTab,
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

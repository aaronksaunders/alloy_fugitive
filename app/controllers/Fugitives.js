var fugitiveCollection = Alloy.Collections.Fugitive;

/**
 * only display the NOT captured items
 *
 * @param {Object} _collection
 */
function dofilter(_collection) {
	return fugitiveCollection.filter(function(_i) {
		return !_i.attributes.captured;
	});
}

// ..
// PRIVATE FUNCTIONS
//
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
		data : fugitiveCollection.get(_e.rowData.model)
	});

	detailController.getView().addEventListener('open', function() {
		if (OS_ANDROID) {
			// for android actionbar
			var activity = detailController.getView().getActivity();
			if (activity != undefined && activity.actionBar != undefined) {
				activity.actionBar.displayHomeAsUp = true;
			}

			activity.actionBar.onHomeIconItemSelected = function() {
				Ti.API.info("Home clicked!");
				detailController.getView().close();
			};
		}
	});
	$.fugitiveTab.open(detailController.getView());

});

//
// INITIALIZERS
//
// add the add button, this can be refactored
if (OS_IOS) {
	$.add.style = Titanium.UI.iPhone.SystemButtonStyle.PLAIN;
	$.add.addEventListener('click', addNewFugitive);
	$.fugitiveWindow.setRightNavButton($.add);
}


// ..
// PRIVATE FUNCTIONS
//
/**
 *
 */
var fugitiveCollection = Alloy.Collections.Fugitive;

/**
 * only display the captured items
 *
 * @param {Object} _collection
 */
function dofilter(_collection) {
	return fugitiveCollection.where({
		captured : 1
	});
}

//
// EVENT LISTENERS
//
$.table.addEventListener('click', function(_e) {
	var detailController = Alloy.createController('FugitiveDetail', {
		parentTab : $.capturedTab,
		data : fugitiveCollection.get(_e.rowData.model)
	});

	if (OS_ANDROID) {
		detailController.getView().addEventListener('open', function() {
			// for android actionbar
			var activity = detailController.getView().getActivity();
			if (activity != undefined && activity.actionBar != undefined) {
				activity.actionBar.displayHomeAsUp = true;
			}

			activity.actionBar.onHomeIconItemSelected = function() {
				Ti.API.info("Home clicked!");
				detailController.getView().close();
			};
		});
	}

	$.capturedTab.open(detailController.getView());
});

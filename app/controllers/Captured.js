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
$.table.addEventListener('click', function(_e) { debugger;
    var detailController = Alloy.createController('FugitiveDetail', {
        parentTab : $.capturedTab,
        data : fugitiveCollection.get(_e.rowData.model)
    });
    $.capturedTab.open(detailController.getView());
});

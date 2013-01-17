var fugitiveCollection = Alloy.Collections.Fugitive;

/**
 * only display the NOT captured items
 *
 * @param {Object} _collection
 */
function dofilter(_collection) {
    debugger;
    return fugitiveCollection.filter(function(_i){
        return !_i.attributes.captured
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
    $.fugitiveTab.open(detailController.getView());
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


var fugitiveCollection = Alloy.Collections.Fugitive;

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
        data : Alloy.Collections.Fugitive.models[_e.index]
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


Ti.API.info('seeded: ' + Ti.App.Properties.hasProperty('seeded'));
//determine if the database needs to be seeded
if (!Ti.App.Properties.hasProperty('seeded')) {

    // add all items to collection
    Alloy.Collections.Fugitive.reset([{
        "name" : "Jeff Haynie"
    }, {
        "name" : "Nolan Wright"
    }, {
        "name" : "Don Thorp"
    }, {
        "name" : "Marshall Culpepper"
    }, {
        "name" : "Blain Hamon"
    }]);

    // save all of the elements
    Alloy.Collections.Fugitive.each(function(_m) {
        _m.save();
    });

    Ti.App.Properties.setString('seeded', 'yuppers');

    $.tabGroup.open();

} else {

    $.tabGroup.open();

}
if(OS_ANDROID) {
    function addNewFugitive() {
        Ti.API.info('menu')
        var addFugitiveController = Alloy.createController('FugitiveAdd');
        var tab_fugitives = $.fugitivesTab.getView(); 
        tab_fugitives.open(addFugitiveController.getView());
    }
}

// force tables to update
Alloy.Collections.Fugitive.fetch();

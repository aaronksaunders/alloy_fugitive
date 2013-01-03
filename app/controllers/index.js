
debugger;

function doClick(e) {
    alert($.label.text);
}


//determine if the database needs to be seeded
if (!Ti.App.Properties.hasProperty('seeded')) {
var net = require('network');

    net.getFugitives(function(data) {
        for (var i = 0; i < data.length; i++) {

            Alloy.createModel("Fugitive", {
                name : data[i].name,
                captured : false
            }).save();

        }
        Ti.App.Properties.setString('seeded', 'yuppers');

        $.tabGroup.open();

        // force tables to update
        Ti.App.fireEvent('update_table');
    });
} else {

    $.tabGroup.open();

}

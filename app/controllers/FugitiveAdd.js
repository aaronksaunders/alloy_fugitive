var args = arguments[0] || {};
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//

//
// EVENT HANDLER
//
$.save_button.addEventListener('click', function(_e) {

    var fugitiveModel = Alloy.createModel("Fugitive", {
        name : $.name_tf.value,
        captured : false
    });

    // save model
    fugitiveModel.save();

    // force tables to update
    Alloy.Collections.Fugitive.fetch();

    // close window
    $.fugitiveAddWindow.close()
});

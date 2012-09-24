var args = arguments[0] || {};
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//
//$.thumbnail.image = args.image;
$.parentController = args.parent;

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

	// force update of UI
	$.parentController.trigger('update_table');

	// close window
	$.fugitiveAddWindow.close()
});

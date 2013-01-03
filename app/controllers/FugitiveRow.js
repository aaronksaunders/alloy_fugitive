debugger;
var model = arguments[0] || {};
var args = model.toJSON();
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//
//$.thumbnail.image = args.image;
$.name.text = args.name || '';
$.row.model = model.clone();
$.row.dataId = args.id;


var args = arguments[0] || {};

var ann = Alloy.Globals.Map.createAnnotation({
	latitude : args.model.get("capturedLat"),
	longitude : args.model.get("capturedLong"),
	title : args.model.get("name"),
	subtitle : ('busted'),
	pincolor : Alloy.Globals.Map.ANNOTATION_RED,
	animate : true
}); 

$.mapView.addAnnotation(ann);

$.mapView.setRegion({
	latitude : args.model.get("capturedLat"),
	longitude : args.model.get("capturedLong"),
	latitudeDelta : 0.1,
	longitudeDelta : 0.1
});


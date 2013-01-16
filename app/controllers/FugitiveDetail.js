var args = arguments[0] || {};
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//
//$.thumbnail.image = args.image;
$.parentController = args.parentTab;

if (args.data) {
	$.detailWindow.title = args.data.get("name");
	$.captured_lbl.text = args.data.get("captured") ? "Captured" : "Not Captured";
	$.image.image = args.data.get("url") || '/images/burglar.png';

	if (!args.data.get("captured")) {
		$.capture_button.visible = 'true';
	} else {
		$.capture_button.visible = 'false';
	}
}

//
// EVENT HANDLER
//
// save a photo to associate with the captured person
$.photo_button.addEventListener('click', function(_e) {
	var cameraOptions = {
		success : function(event) {
			var image = event.media;

			// set image on window
			$.image.image = image;

			//save for future use
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo' + args.data.get("id") + '.png');
			f.write(image);

			// update the model and save
			var fugitiveModel = args.data;
			fugitiveModel.set("url", f.nativePath);
			fugitiveModel.save();

			// force tables to update
			Ti.App.fireEvent('update_table');

		},
		cancel : function() {
			// cancel and close window
		},
		error : function(error) {
			var a = Ti.UI.createAlertDialog({
				title : "Camera Error"
			});
			if (error.code == Ti.Media.NO_CAMERA) {
				a.setMessage("MISSING CAMERA");
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		saveToPhotoGallery : true,
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	};

	// display camera OR gallery
	if (Ti.Media.isCameraSupported) {
		Ti.Media.showCamera(cameraOptions);
	} else {
		Ti.Media.openPhotoGallery(cameraOptions);
	}

});

// display the map
$.map_button.addEventListener('click', function(_e) {
	if (args.data.get("capturedLat")) {
		var mapController = Alloy.createController('MapDetail', {
			model : args.data
		});
		args.parentTab.open(mapController.getView());
	} else {
		alert('Not Captured Yet');
	}
});

// delete the fugitive
$.delete_button.addEventListener('click', function(_e) {
	// delete the model object
	args.data.destroy();

	// force tables to update
	Ti.App.fireEvent('update_table');

	//on android, give a bit of a delay before closing the window...
	if (Ti.Platform.osname == 'android') {
		setTimeout(function() {
			$.detailWindow.close();
		}, 2000);
	} else {
		$.detailWindow.close();
	}
});

// mark where the user was captured
$.capture_button.addEventListener('click', function(_e) {
	Ti.Geolocation.purpose = 'Tracking down criminal scum';
	if (Ti.Geolocation.locationServicesEnabled) {
		if (Ti.Platform.osname === 'android') {
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
		} else {
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		}
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.error) {

				// update the model and save
				var fugitiveModel = args.data;
				fugitiveModel.set("capturedLat", e.coords.latitude);
				fugitiveModel.set("capturedLong", e.coords.longitude);
				fugitiveModel.set("captured", 1);
				fugitiveModel.save();

				// force tables to update
				Ti.App.fireEvent('update_table');

				//on android, give a bit of a delay before closing the window...
				if (Ti.Platform.osname == 'android') {
					setTimeout(function() {
						$.detailWindow.close();
					}, 2000);
				} else {
					$.detailWindow.close();
				}

			} else {
				Ti.UI.createAlertDialog({
					title : "Error",
					message : 'Geolocation failed. Do you have a location set on your Android emulator?'
				}).show();
			}
		});
	} else {
		Ti.UI.createAlertDialog({
			title : "Error",
			message : "No Location Services"
		}).show();
	}
});

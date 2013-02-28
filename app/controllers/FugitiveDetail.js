var args = arguments[0] || {};
//
// this is setting the view elements of the row view
// which is found in views/row.xml based on the arguments
// passed into the controller
//
//$.thumbnail.image = args.image;
$.parentController = args.parentTab;

// add the datatransformation, Tony's busy!!
// dataTransform is not wired up yet, but i
// hacked it into my code
$.fugitiveDetail = _.extend({}, $.fugitiveDetail, {
    transform : function() {
        return dataTransformation(this);
    }
});

// instance variable used in data-binding
// we do this set here to trigger the events
// that will cause the data to be rendered
$.fugitiveDetail.set(args.data.attributes);

/**
 * being used for rendering the model in the view
 * via data-binding
 *
 * @param {Object} _model
 */
function dataTransformation(_model) {

    // toggle the capture button
    $.capture_button.visible = !_model.attributes.captured;
    // hide the map button for at-large fugitives
    $.map_button.visible = _model.attributes.captured;

    return {
        name : _model.attributes.name,
        captured : _model.attributes.captured ? "Captured" : "Not Captured",
        image : _model.attributes.url || '/images/burglar.png',
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
            Alloy.Collections.Fugitive.fetch();

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
    Alloy.Collections.Fugitive.fetch();

    //on android, give a bit of a delay before closing the window...
    if (OS_ANDROID) {
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
        if (OS_ANDROID) {
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
                Alloy.Collections.Fugitive.fetch();

                //on android, give a bit of a delay before closing the window...
                if (OS_ANDROID) {
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

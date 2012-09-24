exports.getFugitives = function(_cb) {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		_cb(JSON.parse(this.responseText));
	};
	xhr.open("GET","http://bountyhunterapp.appspot.com/bounties");
	xhr.send();
};

exports.bustFugitive = function(_udid,_cb) {
	Ti.API.info('busting fugitive for '+_udid);
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		_cb(JSON.parse(this.responseText));
	};
	xhr.open("POST","http://bountyhunterapp.appspot.com/bounties");
	xhr.send({
		udid:_udid
	});
};

/**
 * contain all functionality for all sections
 * ensure that
 * - bfet.min.js is loaded before using this script
 */

var openIssuesJson = null;
var closedIssuesJson = null;

function credential() {
	return {
		username: 'haxpor',
		password: token(),
		oauth: token()
	};
}

function onLoad(){
	// load open issues
	loadOpenIssues().then(function(result) {
		console.log("open issues is loaded: ", result);
		updateHTMLElementIDWithValue("id-openissue_total", result.length);
	}, function(error) {
		// start over
		onLoad();
	})
	.then(function() {
		// load closed issues
		loadClosedIssues().then(function(result) {
			console.log("closed issues is loaded: ", result);
			updateHTMLElementIDWithValue("id-closedissue_total", result.length);
		}, function(error) {
			// start over
			onLoad();
		});
	})
}

function token() {
	var t1 = "1bad6b6a92";
	var t2 = "e474f156a6";
	var t3 = "b97bc938af";
	var t4 = "a73aab7f85";

	return t1 + t2 + t3 + t4;
}

function totalNumberOfOpenIssues() {
	return openIssuesJson != null ? openIssuesJson.length : 0;
}

function totalNumberOfClosedIssues() {
	return closedIssuesJson != null ? closedIssuesJson.length : 0;
}

function updateHTMLElementIDWithValue(id, value) {
	var elem = document.getElementById(id);
	if (elem != null) {
		elem.innerHTML = value;
	}
}

function loadOpenIssues() {
	// get credential
	var cred = credential();

	return new Promise(function(resolve, reject) {
		bfet.get("https://api.github.com/issues?filter=created&state=open", null, { 
        username: cred.username,
        password: cred.password
	  })
	  .then(function(result) {
	  	openIssuesJson = result.response;
	  	return resolve(openIssuesJson);
	  }, function(error) {
	  	return reject(error);
	  });
	});
}

function loadClosedIssues() {
	// get credential
	var cred = credential();

	return new Promise(function(resolve, reject) {
		bfet.get("https://api.github.com/issues?filter=created&state=closed", null, { 
        username: cred.username,
        password: cred.password
	  })
	  .then(function(result) {
	  	closedIssuesJson = result.response;
	  	return resolve(closedIssuesJson);
	  }, function(error) {
	  	return reject(error);
	  });
	});
}
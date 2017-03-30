/**
 * contain all functionality for all sections
 * ensure that
 * - bfet.min.js is loaded before using this script
 */

var openIssuesJson = null;
var closedIssuesJson = null;

var ID = {
	openIssueTotal: "id-openIssue_total",
	closedIssueTotal: "id-closedIssue_total",
	latest5Issues: "id-latest_5_issues"
};

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
		updateHTMLElementIDWithValue(ID.openIssueTotal, result.length);
	}, function(error) {
		// start over
		onLoad();
	})
	.then(function() {
		// load closed issues
		loadClosedIssues().then(function(result) {
			console.log("closed issues is loaded: ", result);
			updateHTMLElementIDWithValue(ID.closedIssueTotal, result.length);

			onSuccessfullyLoadAll(openIssuesJson, closedIssuesJson);
		}, function(error) {
			// start over
			onLoad();
		});
	})
}

function onSuccessfullyLoadAll(openIssuesJson, closedIssuesJson) {
	renderLatest5Issues(openIssuesJson);
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

function renderLatest5Issues(openIssuesJson) {
	var elem = document.getElementById(ID.latest5Issues);

	if (openIssuesJson == null)
		return;
	if (openIssuesJson.length <= 0)
		return;

	var resultHtml = "";
	for (var i=0; i<5; i++) {
		var item = openIssuesJson[i];

		// process to get data
		// - title
		var item__title = item.title.replace(/<\/?[^>]+(>|$)/g, "");
		// - description
		var item__description = item.body == "" ? "no description" : item.body.replace(/<\/?[^>]+(>|$)/g, "");
		// - created at
		var item__localeCreatedAt = new Date(item.created_at).toLocaleDateString();
		// - updated at
		var item__localeUpdatedAt = new Date(item.updated_at).toLocaleDateString();

		resultHtml += `
			<div class="weui-panel__bd">
			  <div class="weui-media-box weui-media-box_text">
			      <a href="${item.html_url}" style="color: black;"><h4 class="weui-media-box__title">${item__title}</h4></a>
			      <p class="weui-media-box__desc">${item__description}</p>
			      <ul class="weui-media-box__info">
			          <li class="weui-media-box__info__meta">${item.repository.name}</li>
			          <li class="weui-media-box__info__meta">created: ${item__localeCreatedAt}</li>
			          <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">updated: ${item__localeUpdatedAt}</li>
			      </ul>
			  </div>
			</div>`;
	}

	elem.insertAdjacentHTML('beforeend', resultHtml);
}
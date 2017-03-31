/**
 * contain all functionality for all sections
 * ensure that
 * - bfet.min.js is loaded before using this script
 */

const kGapLastIndex = 3;
var openIssuesJson = [];
var closedIssuesJson = [];

var ID = {
	openIssuesTotal: 'id-openIssue_total',
	closedIssuesTotal: 'id-closedIssue_total',
	latest5Issues: 'id-latest_5_issues',
	completenessChart: 'id-completeness_chart',
	efficiencyChart: 'id-efficiency_chart'
};

function credential() {
	return {
		username: 'haxpor',
		password: token(),
		oauth: token()
	};
}

function onLoad(){
	// load open issues starting at 1st page
	loadOpenIssues(1).then(function(result) {
		// save returned value
		openIssuesJson = result;
		updateHTMLElementIDWithValue(ID.openIssuesTotal, result.length);
	}, function(error) {
		// start over
		onLoad();
	})
	.then(function() {
		// load closed issues starting at 1st page
		loadClosedIssues(1).then(function(result) {
			// save returned value
			closedIssuesJson = result;
			updateHTMLElementIDWithValue(ID.closedIssuesTotal, result.length);

			onSuccessfullyLoadAll(openIssuesJson, closedIssuesJson);
		}, function(error) {
			// start over
			onLoad();
		});
	})
}

function onSuccessfullyLoadAll(openIssuesJson, closedIssuesJson) {
	// get current year
	var currentYear = new Date().getFullYear();

	renderLatest5Issues(openIssuesJson);
	renderCompletenessChart(openIssuesJson, closedIssuesJson);
	renderEfficiencyChart(currentYear, openIssuesJson, closedIssuesJson);
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

function loadOpenIssues(page) {
	// get credential
	var cred = credential();

	return new Promise(function(resolve, reject) {
		bfet.get("https://api.github.com/issues?per_page=100&filter=created&state=open&page=" + page, null, { 
	      username: cred.username,
	      password: cred.password,
	      headers: {
	      	'Accept': 'application/vnd.github.v3+json'
	      }
	  })
	  .then(function(result) {
	  	if (result.response.length == 0) {
	  		return resolve(null);
	  	}
	  	else {
	  		loadOpenIssues(page + 1)
	  			.then(function(_r) {
	  				var rArray;
	  				if (_r != null) {
	  					rArray = result.response.concat(_r.response);
	  				}
	  				else {
	  					rArray = result.response;
	  				}
	  				return resolve(rArray);
	  			}, function(_e) {
	  				return reject(error);
	  			});
	  	}
	  }, function(error) {
	  	return reject(error);
	  });
	});
}

function loadClosedIssues(page) {
	// get credential
	var cred = credential();

	return new Promise(function(resolve, reject) {
		bfet.get("https://api.github.com/issues?per_page=100&filter=created&state=closed&page=" + page, null, { 
	      username: cred.username,
	      password: cred.password,
	      headers: {
	      	'Accept': 'application/vnd.github.v3+json'
	      }
	  })
	  .then(function(result) {
	  	if (result.response.length == 0) {
	  		return resolve(null);
	  	}
	  	else {
	  		loadOpenIssues(page + 1)
	  			.then(function(_r) {
	  				var rArray;
	  				if (_r != null) {
	  					rArray = result.response.concat(_r.response);
	  				}
	  				else {
	  					rArray = result.response;
	  				}
	  				return resolve(rArray);
	  			}, function(_e) {
	  				return reject(error);
	  			});
	  	}
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

function renderCompletenessChart(openIssuesJson, closedIssuesJson) {

	if (openIssuesJson == null)
		return;
	if (closedIssuesJson == null)
		return;
	if (openIssuesJson.length == 0 && closedIssuesJson.length == 0)
		return;

	var ctx = document.getElementById(ID.completenessChart);
	var completenessValue = (closedIssuesJson.length / (openIssuesJson.length+closedIssuesJson.length)*100).toFixed(2);
	var data = {
    labels: ["Completeness"],
    datasets: [
        {
            label: 'Completeness',
            backgroundColor: ['rgba(66,244,66,0.2)'],
            borderColor: ['rgba(66,244,66,1)'],
            hoverBackgroundColor: ['rgba(66,244,66,0.4)'],
            hoverBorderColor: ['rgba(66,244,66,1)'],
            borderWidth: 1,
            data: [completenessValue],
        }
    ]
	};
	var chart = new Chart(ctx, {
	  type: 'bar',
	  data: data
	});
}

function getMonthShortString(month) {
  if (month == 0) {
    return 'Jan';
  }
  else if (month == 1) {
    return 'Feb';
  }
  else if (month == 2) {
    return 'Mar';
  }
  else if (month == 3) {
    return 'Apr';
  }
  else if (month == 4) {
    return 'May';
  }
  else if (month == 5) {
    return 'Jun';
  }
  else if (month == 6) {
    return 'Jul';
  }
  else if (month == 7) {
    return 'Aug';
  }
  else if (month == 8) {
    return 'Sep';
  }
  else if (month == 9) {
    return 'Oct';
  }
  else if (month == 10) {
    return 'Nov';
  }
  else if (month == 11) {
    return 'Dec';
  }
}

function getDateStringArrayForYear(year) {
  var date = new Date(year, 0, 1);
  var dates = [];

  // include all days if it's still within the same year
  while (date.getFullYear() == year) {
    var d = date.getDate();
    var mStr = getMonthShortString(date.getMonth());

    dates.push(d + " " + mStr);

    // step forward 1 day
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

function dateDiffInDays(a, b) {
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / kMSPerDay);
}

function efficiencyChartRawDataSets(year, openIssuesJson, closedIssuesJson) {
  // fix the year to be the current year first, we (might) fix this later
  var dates = getDateStringArrayForYear(year);

  // open and closed issues datasets
  var openIssuesDataSets = new Array(dates.length);
  var closedIssuesDataSets = new Array(dates.length);
  var closedIssuesCreatedDateDataSets = new Array(dates.length);

  // create a dictionary mapping from index to (date+short month string) i.e. '1 Jan'
  var ddates = {};
  for (var i=0; i<dates.length; i++) {
    ddates[dates[i]] = i;

    // initialize all items to 0
    openIssuesDataSets[i] = 0;
    closedIssuesDataSets[i] = 0;
    closedIssuesCreatedDateDataSets[i] = 0;
  }

  var lastIndexToSlice = dates.length - 1;

  // prepare datasets for efficiency
  // - open issues
  for (var i=0; i<openIssuesJson.length; i++) {
    var item = openIssuesJson[i];

    let createdAtDate = new Date(item.created_at);
    if (createdAtDate.getFullYear() != year)
      continue;

    let key = createdAtDate.getDate() + " " + getMonthShortString(createdAtDate.getMonth());
    lastIndexToSlice = ddates[key];

    openIssuesDataSets[ddates[key]]--;
  }

  // - closed at date
  for (var i=0; i<closedIssuesJson.length; i++) {
    var item = closedIssuesJson[i];

    let closedAtDate = new Date(item.closed_at);
    if (closedAtDate.getFullYear() != year)
      continue;

    let key = closedAtDate.getDate() + " " + getMonthShortString(closedAtDate.getMonth());
    // if the last index is further than before, then update it
    if (ddates[key] > lastIndexToSlice)
      lastIndexToSlice = ddates[key];

    closedIssuesDataSets[ddates[key]]++;
  }
  // - close issues' create-at date
  for (var i=0; i<closedIssuesJson.length; i++) {
    var item = closedIssuesJson[i];

    let createdAtDate = new Date(item.created_at);
    if (createdAtDate.getFullYear() != year)
      continue;

    let key = createdAtDate.getDate() + " " + getMonthShortString(createdAtDate.getMonth());
    // if the last index is further than before, then update it
    if (ddates[key] > lastIndexToSlice)
      lastIndexToSlice = ddates[key];

    closedIssuesCreatedDateDataSets[ddates[key]]++;
  }

  // slice all array
  var endSlicingIndex = (lastIndexToSlice + kGapLastIndex) > dates.length-1 ? dates.length-1 : (lastIndexToSlice + kGapLastIndex);
  dates = dates.slice(0, endSlicingIndex);
  openIssuesDataSets = openIssuesDataSets.slice(0, endSlicingIndex);
  closedIssuesDataSets = closedIssuesDataSets.slice(0, endSlicingIndex);
  closedIssuesCreatedDateDataSets = closedIssuesCreatedDateDataSets.slice(0, endSlicingIndex);

  // return as object
  return {
  	dates: dates,
  	openIssuesDataSets: openIssuesDataSets,
  	closedIssuesDataSets: closedIssuesDataSets,
  	closedIssuesCreatedDateDataSets
  }
}

function efficiencyChartDatasets(year, openIssuesJson, closedIssuesJson) {

	var rawDatasets = efficiencyChartRawDataSets(year, openIssuesJson, closedIssuesJson);
	return {
    labels: rawDatasets.dates,
    datasets: [
      {
        label: 'Closed issues',
        backgroundColor: 'rgba(219,62,48,0.2)',
        borderColor: 'rgba(219,62,48,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(219,62,48,0.4)',
        hoverBorderColor: 'rgba(219,62,48,1)',
        data: rawDatasets.closedIssuesDataSets
      },
      {
        label: 'Open issues',
        backgroundColor: 'rgba(33,165,50,0.2)',
        borderColor: 'rgba(33,165,50,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(33,165,50,0.4)',
        hoverBorderColor: 'rgba(33,165,50,1)',
        data: rawDatasets.openIssuesDataSets
      },
      {
        label: 'Closed issues\' created date',
        backgroundColor: 'rgba(178,178,178,0.2)',
        borderColor: 'rgba(178,178,178,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(178,178,178,0.4)',
        hoverBorderColor: 'rgba(178,178,178,1)',
        data: rawDatasets.closedIssuesCreatedDateDataSets
      }
    ]
  };
}

function renderEfficiencyChart(year, openIssuesJson, closedIssuesJson) {
	if (openIssuesJson == null)
		return;
	if (closedIssuesJson == null)
		return;
	if (openIssuesJson.length == 0 && closedIssuesJson.length == 0)
		return;

	var ctx = document.getElementById(ID.efficiencyChart);
	var options = {
		scales: {
			xAxes: [{
				stacked: true
			}],
			yAxes: [{
				stacked: true
			}]
		}
	};

	var chart = new Chart(ctx, {
		type: 'bar',
		data: efficiencyChartDatasets(year, openIssuesJson, closedIssuesJson),
		options: options
	});
}
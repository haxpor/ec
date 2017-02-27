import React, { Component } from 'react';
import { Panel, 
	PanelHeader, 
	PanelBody, 
	MediaBox, 
	MediaBoxTitle, 
	MediaBoxDescription, 
	MediaBoxInfo, 
	MediaBoxInfoMeta,
  Flex,
  FlexItem,
  Icon
} from 'react-weui';

import Page from '../../core/page/page';
import issue_icon from '../../../../public/images/ic_assignment_turned_in_black_24px.svg';

import '../../core/icons/icons.css';

import IssuesManager from '../../util/issuesManager';
import { Bar } from 'react-chartjs-2';

const IconBox = (props) => (
  <div className="icon-box">
    {props.icon}
    <div className="icon-box__ctn">
      <h3 className="icon-box__title">{props.title}</h3>
      <p className="icon-box__desc">{props.desc}</p>
    </div>
  </div>
)

const targetYear = 2017;

const aStyle = {
  color: 'black'
}

class Issues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openIssuesJson: null,
      closedIssuesJson: null,
      chartDataSets: {}
    }
  }

  componentWillMount() {
    IssuesManager.fetch()
      .then((result) => {

        // fix the year to be the current year first, we (might) fix this later
        var dates = this.getDateStringArrayForYear(targetYear);

        // open and closed issues datasets
        var openIssuesDataSets = new Array(dates.length);
        var closedIssuesDataSets = new Array(dates.length);

        // create a dictionary mapping from index to (date+short month string) i.e. '1 Jan'
        var ddates = {};
        for (var i=0; i<dates.length; i++) {
          ddates[dates[i]] = i;

          // initialize all items to 0
          openIssuesDataSets[i] = 0;
          closedIssuesDataSets[i] = 0;
        }

        let completeness = (IssuesManager.closedIssuesJson.length / IssuesManager.totalIssues * 100).toFixed(2);
        var efficiency = {};

        // prepare datasets for efficiency
        for (var i=0; i<IssuesManager.openIssuesJson.length; i++) {
          var item = IssuesManager.openIssuesJson[i];

          let createdAtDate = new Date(item.created_at);
          if (createdAtDate.getFullYear() != targetYear)
            break;

          let key = createdAtDate.getDate() + " " + this.getMonthShortString(createdAtDate.getMonth());

          openIssuesDataSets[ddates[key]]--;
        }

        for (var i=0; i<IssuesManager.closedIssuesJson.length; i++) {
          var item = IssuesManager.closedIssuesJson[i];

          let createdAtDate = new Date(item.created_at);
          if (createdAtDate.getFullYear() != targetYear)
            break;

          let key = createdAtDate.getDate() + " " + this.getMonthShortString(createdAtDate.getMonth());

          closedIssuesDataSets[ddates[key]]++;
        }

        this.setState({ 
          openIssuesJson: IssuesManager.openIssuesJson,
          closedIssuesJson: IssuesManager.closedIssuesJson,
          chartDataSets: {
            completeness: {
              labels: ['All Issues'],
              datasets: [
                {
                  label: 'Completeness ' + completeness + '%',
                  backgroundColor: 'rgba(66,244,66,0.2)',
                  borderColor: 'rgba(66,244,66,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(66,244,66,0.4)',
                  hoverBorderColor: 'rgba(66,244,66,1)',
                  data: [completeness]
                }
              ]
            },

            efficiency: {
              labels: dates,
              datasets: [
                {
                  label: 'Open issues',
                  backgroundColor: 'rgba(219,62,48,0.2)',
                  borderColor: 'rgba(219,62,48,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(219,62,48,0.4)',
                  hoverBorderColor: 'rgba(219,62,48,1)',
                  data: openIssuesDataSets
                },
                {
                  label: 'Closed issues',
                  backgroundColor: 'rgba(33,165,50,0.2)',
                  borderColor: 'rgba(33,165,50,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(33,165,50,0.4)',
                  hoverBorderColor: 'rgba(33,165,50,1)',
                  data: closedIssuesDataSets
                }
              ]
            }
          }
        });

      }, (e) => {
        console.log(e + ":" + e.message);
      })
  }

  getMonthShortString(month) {
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

  getDateStringArrayForYear(year) {
    var date = new Date(year, 0, 1);
    var dates = [];

    // include all days if it's still within the same year
    while (date.getFullYear() == year) {
      var d = date.getDate();
      var mStr = this.getMonthShortString(date.getMonth());

      dates.push(d + " " + mStr);

      // step forward 1 day
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

	renderLatestFiveOpenIssues(openIssues) {
    return openIssues.slice(0, 5).map((item, i) => {

      let createdAtDate = new Date(item.created_at);
      let updatedAtDate = new Date(item.updated_at);
      var locale_createdAt = createdAtDate.toLocaleDateString();
      var locale_updatedAt = updatedAtDate.toLocaleDateString();

      return (
        <MediaBox type="text" key={i}>
          <a href={item.html_url} style={aStyle}>
            <MediaBoxTitle>
              {item.title}
            </MediaBoxTitle>
            <MediaBoxDescription>
              {item.body == "" ? "no description" : item.body}
            </MediaBoxDescription>
            <MediaBoxInfo>
              <MediaBoxInfoMeta>{item.repository.name}</MediaBoxInfoMeta>
              <MediaBoxInfoMeta extra>created: {locale_createdAt}</MediaBoxInfoMeta>
              <MediaBoxInfoMeta>updated: {locale_updatedAt}</MediaBoxInfoMeta>
            </MediaBoxInfo>
          </a>
        </MediaBox>
      );
    });
	}

  renderCompletenessChart(datasets) {
    return (
      <Bar
        data={datasets}
        width={200}
        height={70}
      />
    );
  }

  renderEfficiencyChart(datasets) {
    return (
      <Bar
        data={datasets}
        width={200}
        height={120}
        options={{
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }}
      />
    );
  }

  renderNumberSummary(numberOfOpenIssues, numberOfClosedIssues) {
    var closedTitle = "Closed " + numberOfClosedIssues;
    var openTitle = "Open " + numberOfOpenIssues;

    return (
      <Flex>
        <FlexItem>
          <IconBox
            icon={<Icon size="large" value="success" />}
            title={closedTitle}
            desc="You have successfully closed issues!"
          />
        </FlexItem>
        <FlexItem>
          <IconBox
            icon={<Icon size="large" value="warn" />}
            title={openTitle}
            desc="You still have open issues to work on."
          />
        </FlexItem>
      </Flex>
    );
  }

  render() {
    const {children} = this.props;

    return (
      <Page className="issues" title="Issues" subTitle="See all open/closed issues">
        <Panel>
          <PanelBody>
            <MediaBox type="text">
              {this.state.openIssuesJson != null && this.state.closedIssuesJson != null ? this.renderNumberSummary(this.state.openIssuesJson.length, this.state.closedIssuesJson.length) : "" }
            </MediaBox>
          </PanelBody>
        </Panel>
        <Panel>
        	<PanelHeader>
        		Latest 5 Issues
        	</PanelHeader>
        	<PanelBody>
        		{this.state.openIssuesJson != null && this.state.openIssuesJson.length > 0 ? this.renderLatestFiveOpenIssues(this.state.openIssuesJson) : "" }
        	</PanelBody>
        </Panel>
        <Panel>
          <PanelHeader>
            Completeness Chart
          </PanelHeader>
          <PanelBody>
            <MediaBox type="text">
              {this.state.chartDataSets.completeness != null ? this.renderCompletenessChart(this.state.chartDataSets.completeness) : "" }
            </MediaBox>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeader>
            Efficiency Chart
          </PanelHeader>
          <PanelBody>
            <MediaBox type="text">
              {this.state.chartDataSets.efficiency != null ? this.renderEfficiencyChart(this.state.chartDataSets.efficiency) : ""}
            </MediaBox>
          </PanelBody>
        </Panel>
      </Page>
    );
  }
}

export default Issues;

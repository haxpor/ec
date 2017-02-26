import React, { Component } from 'react';
import { Panel, 
	PanelHeader, 
	PanelBody, 
	MediaBox, 
	MediaBoxTitle, 
	MediaBoxDescription, 
	MediaBoxInfo, 
	MediaBoxInfoMeta
} from 'react-weui';

import Page from '../../core/page/page';
import issue_icon from '../../../../public/images/ic_assignment_turned_in_black_24px.svg';
import IssuesManager from '../../util/issuesManager';
import { Bar } from 'react-chartjs-2';

const aStyle = {
  color: 'black'
}

var chartDataSets = {
  
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

        let completeness = (IssuesManager.closedIssuesJson.length / IssuesManager.totalIssues * 100).toFixed(2);

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

            }
          }
        });

      }, (e) => {
        console.log(e + ":" + e.message);
      })
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

  renderEfficiencyChart() {
    return (
      <MediaBox type="text">
        Test
      </MediaBox>
    );
  }

  render() {
    const {children} = this.props;

    return (
      <Page className="issues" title="Issues" subTitle="See all open/closed issues">
        <Panel>
        	<PanelHeader>
        		Latest 5 Issues
        	</PanelHeader>
        	<PanelBody>
        		{this.state.openIssuesJson != null && this.state.openIssuesJson.length > 0 ? this.renderLatestFiveOpenIssues(this.state.openIssuesJson) : ""}
        	</PanelBody>
        </Panel>
        <Panel>
          <PanelHeader>
            Completness Chart
          </PanelHeader>
          <PanelBody>
            <MediaBox type="text">
              {this.state.chartDataSets.completeness != null ? this.renderCompletenessChart(this.state.chartDataSets.completeness) : ""}
            </MediaBox>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeader>
            Efficiency Chart
          </PanelHeader>
          <PanelBody>
            {this.renderEfficiencyChart()}
          </PanelBody>
        </Panel>
      </Page>
    );
  }
}

export default Issues;

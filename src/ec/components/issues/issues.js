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

const aStyle = {
  color: 'black'
}

class Issues extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openIssuesJson: null,
      closedIssuesJson: null
    }
  }

  componentWillMount() {
    IssuesManager.fetch()
      .then((result) => {
        this.setState({ openIssuesJson: IssuesManager.openIssuesJson });

      }, (e) => {
        console.log(e + ":" + e.message);
      })
  }

	renderLatestFiveOpenIssues(openIssues) {
    return openIssues.slice(0, 5).map((item, i) => {
      return (
        <MediaBox type="text" >
          <a href={item.html_url} style={aStyle}>
            <MediaBoxTitle>
              {item.title}
            </MediaBoxTitle>
            <MediaBoxDescription>
              {item.body == "" ? "no description" : item.body}
            </MediaBoxDescription>
            <MediaBoxInfo>
              <MediaBoxInfoMeta>WeUI</MediaBoxInfoMeta>
              <MediaBoxInfoMeta>2016-8-8</MediaBoxInfoMeta>
              <MediaBoxInfoMeta extra>More</MediaBoxInfoMeta>
            </MediaBoxInfo>
          </a>
        </MediaBox>
      );
    });
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
        		{this.state.openIssuesJson != null && this.state.openIssuesJson.length > 0 ? this.renderLatestFiveOpenIssues(this.state.openIssuesJson) : children}
        	</PanelBody>
        </Panel>
      </Page>
    );
  }
}

export default Issues;

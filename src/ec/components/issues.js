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

import Page from './page/page';
import issue_icon from '../../../public/images/ic_assignment_turned_in_black_24px.svg';

class Issues extends Component {
  render() {
    return (
      <Page className="issues" title="Issues" subTitle="See all open/closed issues">
        
      </Page>
    );
  }
}

export default Issues;

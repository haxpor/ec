import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import issue_icon from '../../assets/images/ic_assignment_turned_in_black_24px.svg';
import Page from './page/page';

class Issues extends Component {
  render() {
    return (
      <Page className="issues" title="Issues" subTitle="See all open/closed issues">
        
      </Page>
    );
  }
}

export default Issues;

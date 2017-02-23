import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import contribute_icon from '../../assets/images/ic_group_black_24px.svg';

class MainGrid extends Component {
  render() {
    return (
      <div>
        <Grids data={data}/>
      </div>
    );
  }
}

export default MainGrid;

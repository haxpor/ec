import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import issue_icon from '../../assets/images/ic_assignment_turned_in_black_24px.svg';
import project_icon from '../../assets/images/ic_assessment_black_24px.svg';

const {Grids} = WeUI;

const data = [
  {
    icon: <img src={issue_icon} alt="issue icon"/>,
    label: 'Issues',
    href: 'http://blog.wasin.io'
  },
  {
    icon: <img src={project_icon} alt="project icon"/>,
    label: 'Projects',
    href: 'javascript:;'
  },
  {
    icon: <img src={issue_icon} alt="project icon"/>,
    label: 'Issues',
    href: 'javascript:;'
  },
  {
    icon: <img src={project_icon} alt="project icon"/>,
    label: 'Projects',
    href: 'javascript:;'
  },
  {
    icon: <img src={issue_icon} alt="project icon"/>,
    label: 'Issues',
    href: 'javascript:;'
  },
  {
    icon: <img src={project_icon} alt="project icon"/>,
    label: 'Projects',
    href: 'javascript:;'
  }
];

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

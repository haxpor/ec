import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import issue_icon from '../../../public/images/ic_assignment_turned_in_black_24px.svg';
import project_icon from '../../../public/images/ic_apps_black_24px.svg';
import contribute_icon from '../../../public/images/ic_group_black_24px.svg';
import blog_icon from '../../../public/images/ic_insert_drive_file_black_24px.svg';

const {Grids} = WeUI;

const data = [
  {
    icon: <img src={issue_icon} alt="issue icon"/>,
    label: 'Issues',
    href: '/issues'
  },
  {
    icon: <img src={project_icon} alt="project icon"/>,
    label: 'Projects',
    href: '/projects'
  },
  {
    icon: <img src={contribute_icon} alt="contribute icon"/>,
    label: 'Contributes',
    href: '/contributes'
  },
  {
    icon: <img src={blog_icon} alt="blog icon"/>,
    label: 'Blog',
    href: 'http://blog.wasin.io'
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

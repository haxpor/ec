import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Issues from './ec/components/issues';
import Projects from './ec/components/projects';
import './index.css';

import { Router, Route, Link, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
  	<Route path="/" component={App}/>
  	<Route path="/issues" component={Issues}/>
  	<Route path="/projects" component={Projects}/>
  </Router>,
  document.getElementById('root')
);

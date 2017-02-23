import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Issues from './ec/components/issues';
import Projects from './ec/components/projects';
import Contributes from './ec/components/contributes';
import './index.css';

import { Router, Route, Link, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
  	<Route path="/" component={App}/>
  	<Route path="/issues" component={Issues}/>
  	<Route path="/projects" component={Projects}/>
  	<Route path="/contributes" component={Contributes}/>
  </Router>,
  document.getElementById('root')
);

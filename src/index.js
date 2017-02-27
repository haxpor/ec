import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Issues from './ec/components/issues/issues';
import Projects from './ec/components/projects/projects';
import Contributes from './ec/components/contributes/contributes';
import './index.css';

import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
  	<Route path="/" component={App}/>
  	<Route path="/issues" component={Issues}/>
  	<Route path="/projects" component={Projects}/>
  	<Route path="/contributes" component={Contributes}/>
  </Router>,
  document.getElementById('root')
);

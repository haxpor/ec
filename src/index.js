import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import MainGrid from './ec/components/maingrid';
import './index.css';

import { Router, Route, Link, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
  	<Route path="/" component={App}/>
  	<Route path="/maingrid" component={MainGrid}/>
  </Router>,
  document.getElementById('root')
);

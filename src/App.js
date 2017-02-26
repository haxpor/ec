import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from './head.jpg';
import './App.css';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

import MainGrid from './ec/components/maingrid';

import { Button } from 'react-weui';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ec</h2>
        </div>
        <MainGrid />
      </div>
    );
  }
}

export default App;

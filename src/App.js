import React, { Component } from 'react';
import { Link } from 'react-router'
import logo from './head.jpg';
import './App.css';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

import MainGrid from './ec/components/maingrid';

import WeUI from 'react-weui';
const {Button} = WeUI;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ec</h2>
        </div>
        <MainGrid />
        <Button onClick={()=>{window.location='/maingrid';}}>Click me</Button><Link to={`/maingrid`}>MainGrid</Link>
      </div>
    );
  }
}

export default App;

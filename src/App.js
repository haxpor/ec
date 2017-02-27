import React, { Component } from 'react';
import logo from './head.jpg';
import './App.css';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

import MainGrid from './ec/components/maingrid';

import { Button, Footer, FooterText } from 'react-weui';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>ec</h2>
        </div>
        <MainGrid />
        <br/><br/>
        <Footer className="App-footer">
          <FooterText>Copyright &copy; 2017 wasin.io</FooterText>
        </Footer>
      </div>
    );
  }
}

export default App;

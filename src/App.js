import React, { Component } from 'react';
import logo from './head.jpg';
import './App.css';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

import MainGrid from './ec/components/maingrid';
import Header from './ec/components/header/header';
import Footer from './ec/components/footer/footer';

import { Button, FooterText } from 'react-weui';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <div className="App App-Wrapper">
        <MainGrid />
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;

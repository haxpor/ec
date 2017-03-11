import React, { Component } from 'react';
import weui from '../../../../node_modules/weui/dist/example/weui.min.js';

var dashboardurl = 'http://dashboard.wasin.io';
var projectsurl = 'http://projects.wasin.io';

class Header extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.showMainPagePicker.bind(this);
	}

  render() {
    return (
    	<header className="site-header">
	      <div className="wrapper">
	    		<a className="site-title-white-bold" href>Wasin</a>
	    		<a className="site-title" href="/">'s Projects</a>
	    		<nav className="site-nav">
	    			<a href="#" className="menu-icon" id="hamburgerBtn" onClick={this.onClick}>
	    				<svg viewBox="0 0 18 15">
			          <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>
			          <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>
			          <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>
			        </svg>
	    			</a>
	    			<div className="trigger">
				      <a className="page-link" href={dashboardurl}>Back to Dashboard</a>
				    </div>
	    		</nav>
	    	</div>
	    </header>
    );
  }

  showMainPagePicker() {

		var defaultValue = 0;

		// root url is totally different from other urls
		if (window.location.href.search(dashboardurl) !== -1) {
			defaultValue = 0;
		}

		weui.picker([
		{
			label: "Back to Dashboard",
			value: 0,
		},
		{
			label: "Projects Home",
			value: 1
		},
	  ], {
	      defaultValue: [defaultValue],
	      onChange: function (result) {
	          console.log("changed: ", result);
	      },
	      onConfirm: function (result) {
	      		console.log("confirm: ", result);
	          var value = result[0].value;
	          if (value === 0) {
	          	window.location = dashboardurl;
	          	console.log(1);
	          }
	          else if (value === 1) {
	          	window.location = projectsurl;
	          	console.log(2);
	          }
	      },
	      id: 'hamburgerBtn'
	  });
	}
}

export default Header;

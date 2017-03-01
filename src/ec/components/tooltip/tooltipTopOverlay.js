import React, { Component } from 'react';
import { Toptips } from 'react-weui';

const kDefaultTimeout = 5000;

class TooltipTopOverlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	isShow: false,
      message: 'something went wrong!',
    	timer: null
    }
  }

  componentWillUnmount() {
  	this.state.timer && clearTimeout(this.state.timer);
  }

  // show tooltip for timeout (millisecond) until it will disappear
  show(message, timeout) {
  	this.setState({ message: message, isShow: true});

    if (typeof timeout == "undefined") {
      timeout = kDefaultTimeout;
    }

  	this.state.timer = setTimeout(() => {
  		this.setState({isShow: false});
  	}, timeout);
  }

  render() {

  	return (
  		<Toptips type={this.props.type} show={this.state.isShow}>{this.state.message}</Toptips>
  	);
  }
}

TooltipTopOverlay.propTypes = {
	/**
	 * Type can be "warn", "primary", and "info"
	 */
	type: React.PropTypes.string,
};

TooltipTopOverlay.defaultProps = {
	type: 'warn'
};

export default TooltipTopOverlay;
import React, { Component } from 'react';
import InlineCss from "react-inline-css";



export default class GradationSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraged: false,
      org: {
        x: 0, // reserve
        y: 0, 
      },
      top: 0, // TODO: Add marginTop props value
    };
  }

  componentDidMount() {
    this.onMouseMove = ::this.onMouseMove;
    this.onMouseUp = ::this.onMouseUp;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e) {
    this.setState({
      isDraged: true,
      org: {
        x: this.refs.handler.getBoundingClientRect().left,
        y: this.refs.handler.getBoundingClientRect().top,
      }
    });
  }

  onMouseMove(e) {
    if (!this.state.isDraged) return;
    const top = this.clamp(e.clientY - this.state.org.y, 0, 400);
    this.setState({ top });
  }

  onMouseUp() {
    console.log('mouseUp');
    this.setState({ isDraged: false });
  }

  onTouchStart() {

  }

  onTouchEnd() {

  }

  clamp(n, min = n, max = n) {
    return Math.max(Math.min(n, max), min);
  }

  render() {
    const { style, className } = this.props;
    return (
      <InlineCss
         className={ className }
         style={ Object.assign({}, style, { position: 'relative', height: 'auto', width: 'auto' }) }
         stylesheet={`
           & > div {
             width: 8px;
             height: 300px;
             background: red;
             border-radius: 10px;
             position: absolute;
             top: 0;
             left: 0;
           }

           & > div:nth-child(2) {
             background: -webkit-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -moz-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -ms-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -o-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
           }

           & > a {
             display: block;
             width: 16px;
             height: 16px;
             background: #333;
             border-radius: 50%;
             position: absolute;
             margin: 0 0 0 -4px;
             left: 0;
             cursor: pointer;
           }
         `} >
        <div />
        <div />
        <a
           ref="handler"
           onMouseDown={ ::this.onMouseDown }
           style={{ top: `${ this.state.top }px` }}
        />
      </InlineCss>
    );
  }
}

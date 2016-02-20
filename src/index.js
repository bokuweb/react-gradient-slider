import React, { Component, PropTypes } from 'react';
import InlineCss from "react-inline-css";

export default class GradationSlider extends Component {
  static propTypes = {
    slider: PropTypes.object.isRequired,
    style: PropTypes.object,
    onSlideStart: PropTypes.func,
    onSlide: PropTypes.func,
    onSlideStop: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    style: {},
    onSlideStart: () => null,
    onSlide: () => null,
    onSlideStop: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDraged: false,
      origin: {
        x: 0, // reserve
        y: 0, 
      },
      top: 0,
      left: 0, // reserve
    };
  }

  componentDidMount() {
    this.onMouseMove = ::this.onMouseMove;
    this.onTouchMove = ::this.onTouchMove;
    this.onMouseUp = ::this.onMouseUp;
    this.onTouchEnd = ::this.onTouchEnd;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  onMouseDown(e) {
    this.setState({
      isDraged: true,
      origin: {
        x: this.refs.bar.getBoundingClientRect().left,
        y: this.refs.bar.getBoundingClientRect().top,
      }
    });
  }

  onMouseMove(e) {
    if (!this.state.isDraged) return;
    const { slider, onSlide } = this.props;
    const top = this.clamp(e.clientY - this.state.origin.y, 0, slider.height);
    this.setState({ top });
    onSlide(~~((top / slider.height) * 100));
  }


  onMouseUp() {
    this.setState({ isDraged: false });
  }

  onTouchStart(e) {
    this.onMouseDown(e.touches[0]);
  }

  onTouchMove(e) {
    this.onMouseMove(e.touches[0]);
  }

  onTouchEnd() {
    this.setState({ isDraged: false });
  }

  clamp(n, min = n, max = n) {
    return Math.max(Math.min(n, max), min);
  }

  render() {
    const { style, className, slider } = this.props;
    return (
      <InlineCss
         className={ className }
         style={ Object.assign({}, style, { position: 'relative', height: 'auto', width: 'auto' }) }
         stylesheet={`
           & > div {
             width: ${slider.width}px;
             height: ${slider.height}px;
             background: red;
             border-radius: 10px;
             position: absolute;
             top: 0;
             left: 0;
           }

           & > div:nth-child(1) {
             background: -webkit-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -moz-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -ms-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: -o-linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             background: linear-gradient(top,  #f00 0%, #ff0 25%, #0f0 50%, #0ff 75%, #00f 100%);
             border-radius: 10px;
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
        <div
           ref="bar"
           style={{ height: `${ slider.height- this.state.top }px`, top: `${ this.state.top }px` }}
        />
        <div style={{ height: `${ this.state.top + 10 }px` }} />
        <a
           ref="handler"
           onMouseDown={ ::this.onMouseDown }
           style={{ top: `${ this.state.top }px` }}
        />
      </InlineCss>
    );
  }
}

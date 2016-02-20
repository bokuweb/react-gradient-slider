import React, { Component, PropTypes } from 'react';
import InlineCss from "react-inline-css";

export default class GradationSlider extends Component {
  static propTypes = {
    slider: PropTypes.object.isRequired,
    style: PropTypes.object,
    onSlideStart: PropTypes.func,
    onSlide: PropTypes.func,
    onSlideStop: PropTypes.func,
    handlerColor: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    style: {},
    slider: {
      width: 10,
      height: 100,
      borderRadius: 10,
    },
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
    this.props.onSlideStart();
  }

  onMouseMove(e) {
    if (!this.state.isDraged) return;
    const { slider, onSlide } = this.props;
    const top = this.clamp(e.clientY - this.state.origin.y, 0, slider.height);
    this.setState({ top });
    onSlide(this.getSliderValue(top, slider.height));
  }

  onMouseUp(e) {
    this.setState({ isDraged: false });
    const { slider, onSlideStop } = this.props;
    const top = this.clamp(e.clientY - this.state.origin.y, 0, slider.height);
    onSlideStop(this.getSliderValue(top, slider.height));
  }

  onTouchStart(e) {
    this.onMouseDown(e.touches[0]);
  }

  onTouchMove(e) {
    this.onMouseMove(e.touches[0]);
  }

  onTouchEnd(e) {
    this.onMouseUp(e.touches[0]);
  }

  clamp(n, min = n, max = n) {
    return Math.max(Math.min(n, max), min);
  }

  getSliderValue(top, height) {
    return ~~((top / height) * 100);
  }

  render() {
    const { top } = this.state;
    const { style, className, slider, handler } = this.props;
    return (
      <InlineCss
         className={ className }
         style={ Object.assign({}, style, { position: 'relative', height: 'auto', width: 'auto' }) }
         stylesheet={`

           & > div {
             width: ${ slider.width }px;
             height: ${ slider.height }px;
             background: red;
             border-radius: ${ typeof slider.borderRadius !== 'undefined' ? slider.borderRadius : 10 }px;
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
             width: ${ handler.width }px;
             height: ${ handler.height }px;
             background: ${ handler.color };
             position: absolute;
             margin: 0 0 0 ${ (slider.width -  handler.width) / 2 }px;;
             left: 0;
             cursor: pointer;
           }
        `} >
        <div />
        <div style={{ height: `${ slider.height - top }px`, top: `${ top }px` }} />
        <div ref="bar" style={{ height: `${ top < handler.height / 2 ? top + handler.height : top }px` }} />
        <a
           ref="handler"
           onMouseDown={ ::this.onMouseDown }
           style={ Object.assign({}, handler.style, { top: `${ top - handler.height / 2 }px` })}
        />
      </InlineCss>
    );
  }
}

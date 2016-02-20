import React, {Component} from 'react';
import Slider from '../../src';

export default class Example extends Component{
  render() {
    return (
      <Slider
         style={{ margin: '100px 400px' }}
         slider={{ height: 290,  width: 20, borderRadius: 10 }}
         onSlide={(value) => console.log(value)}
       />
    );
  }
}

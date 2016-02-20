import React, {Component} from 'react';
import Slider from '../../src';

export default class Example extends Component{
  render() {
    return (
      <Slider
         style={{ margin: '100px 400px' }}
         slider={{ height: 290,  width: 10, borderRadius: 10 }}
         handler={{ height: 10,  width: 20, style: {backgroundColor: '#ccc'} }}
         onSlideStart={ () => console.log(`slide start`) }
         onSlide={ value => console.log(value)}
         onSlideStop={ value => console.log(`slide end ${value}`)}
       />
    );
  }
}

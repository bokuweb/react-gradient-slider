import React from 'react';
import { shallow } from 'enzyme';
import assert from 'power-assert';
import Slider from '../src/index';

describe('<Slider />', () => {
  it('Should root warapper render as <InlineCss>', () => {
    const wrapper = shallow(<Slider />);
    assert.equal(wrapper.text(), '<InlineCss />');
  });
});

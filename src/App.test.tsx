import React from 'react';
import * as enzyme from 'enzyme'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Finds the text', () => {
    const wrapper = enzyme.shallow(<App />)
    expect(wrapper.find('p').text()).toEqual('Working')
})
import React from 'react';
import ReactDOM from 'react-dom';
import MyAlerts from './MyAlerts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyAlerts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
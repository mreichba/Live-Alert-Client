import React from 'react';
import ReactDOM from 'react-dom';
import DeleteAccount from './DeleteAccount';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteAccount />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SignupPage from './signupPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SignupPage />
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
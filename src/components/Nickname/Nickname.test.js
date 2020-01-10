import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Nickname from './Nickname';

it.only('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Nickname />
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
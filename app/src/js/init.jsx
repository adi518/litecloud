/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/App.jsx';
import SC from 'soundcloud';

SC.initialize({client_id: 'd3cc13db45cba4f1ff6846dc46b0ef8a'});

ReactDOM.render(
  <App/>, document.getElementById('root'));

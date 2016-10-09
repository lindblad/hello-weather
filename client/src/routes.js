"use strict";
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Landing from './components/Landing';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
  </Route>
);
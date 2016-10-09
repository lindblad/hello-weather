
"use strict";

import ServerAPI from '../utils/ServerAPI';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {hashHistory} from 'react-router';

const AppActionCreators = {
  requestData() {
    ServerAPI.requestData();
  },
  navigateTo(url) {
    hashHistory.push(url);
  },
};

export default AppActionCreators;
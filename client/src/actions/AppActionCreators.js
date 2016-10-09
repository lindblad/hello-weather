
"use strict";

import ServerAPI from '../utils/ServerAPI';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {hashHistory} from 'react-router';

const AppActionCreators = {
  requestData() {
    ServerAPI.requestData();
  },
  addLocation(location) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ADD_LOCATION,
      location: location
    });
  },
  removeLocation(location) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REMOVE_LOCATION,
      location: location
    });
  },
  navigateTo(url) {
    hashHistory.push(url);
  },
};

export default AppActionCreators;
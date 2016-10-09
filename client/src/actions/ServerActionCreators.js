"use strict";

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const ServerActionCreators = {
  handleDataSuccess(response, user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_DATA_SUCCESS,
      response: response,
      user: user
    });
  }
};

export default ServerActionCreators;
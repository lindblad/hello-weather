"use strict";
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {EventEmitter} from 'events';
import assign from 'object-assign';
const CHANGE_EVENT = 'change';
import _ from 'underscore';

var _user={displayName: "unknown", name: "unknown", "gender": "unknown"};
var _locations = [];

const AppStore = assign({}, EventEmitter.prototype, {
  getTitle: function() {
    return "hello weather";
  },
  getUser: function() {
    return _user;
  },
  getLocations: function() {
    return _locations;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.type) {
      case ActionTypes.REQUEST_DATA_SUCCESS:
        _user = action.user;
        if (window.trackJs)
          window.trackJs.configure({ userId: action.user.displayName });
        AppStore.emitChange();
        break;
      case ActionTypes.ADD_LOCATION:
        {
          let {location} = action;
          _locations.unshift(location);
        }
        AppStore.emitChange();
        break;
      default:
        // no op
    }
  })
});

export default AppStore;
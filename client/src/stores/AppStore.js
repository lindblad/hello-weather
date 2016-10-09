"use strict";
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {EventEmitter} from 'events';
import assign from 'object-assign';
const CHANGE_EVENT = 'change';
import _ from 'underscore';

var _user={displayName: "unknown", name: "unknown", "gender": "unknown"};
var _locations = [];
var _state = "idle";

const AppStore = assign({}, EventEmitter.prototype, {
  getTitle() {
    return "hello weather";
  },
  getUser() {
    return _user;
  },
  getLocations() {
    return _locations;
  },
  getState() {
    return _state;
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
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
      case ActionTypes.REMOVE_LOCATION:
        {
          let {location} = action;
          _locations.splice(_locations.indexOf(location), 1);
        }
        AppStore.emitChange();
        break;
      case ActionTypes.CHECK_WEATHER:
        {
          _state = "checking";
        }
        AppStore.emitChange();
        break;
      case ActionTypes.REQUEST_WEATHER_SUCCESS:
        let {response, user, location} = action;
        {
          _locations.splice(_locations.indexOf(location), 1);
          console.log(response);
          if (_locations.length === 0)
            _state="idle";
        }
        AppStore.emitChange();
        break;
      default:
        // no op
    }
  })
});

export default AppStore;
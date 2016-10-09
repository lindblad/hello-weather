"use strict";

import {Dispatcher} from 'flux';
import PayloadSources from '../constants/PayloadSources';
import assign from 'object-assign';

const AppDispatcher = assign(new Dispatcher, {

  handleServerAction: function(action) {
    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction: function(action) {
    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});


export default AppDispatcher;
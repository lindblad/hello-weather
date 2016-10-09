"use strict";

import ActionCreators from '../actions/ServerActionCreators';
import $ from 'jquery';

function GET(url, successHandler, errorHandler) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function(response, status, xhr) {
      if (response.redirect) {
        window.location.href = response.redirect;
      } else {
        var user = {
          id: xhr.getResponseHeader('user-id'),
          displayName: xhr.getResponseHeader('user-displayname'),
          name: xhr.getResponseHeader('user-name'),
          gender: xhr.getResponseHeader('user-gender'),
          photo: xhr.getResponseHeader('user-photo')
        };
        successHandler(response, user);
      }
    },
    error: function(xhr, status, err) {
      if (!errorHandler) return;
      errorHandler(status, err);
    }
  });
}

const ServerAPI = {
  requestData() {
    GET("/api/data", ActionCreators.handleDataSuccess);
  }
};

export default ServerAPI;
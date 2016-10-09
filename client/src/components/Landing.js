"use strict";

import React from 'react';
import {Link} from 'react-router';
import AppStore from '../stores/AppStore';

const Landing = React.createClass({
  displayName: "Landing",
  render() {
    return (
      <div className="ui white vertical segment">
        <div className="ui container main">
          <div className="ui raised segment">
            <div className="ui action input">
              <input type="text" placeholder="Enter a location..."/>
                <button className="ui blue icon button">
                  <i className="plus icon" />
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Landing;
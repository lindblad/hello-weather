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
          Here goes the content
        </div>
      </div>
    );
  }
});

export default Landing;
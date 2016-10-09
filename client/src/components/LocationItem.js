"use strict";

import React from 'react';
import ActionCreators from '../actions/AppActionCreators';

const LocationItem = React.createClass({
  displayName: "LocationItem",
  _onRemoveLocation() {
    console.log(`removing ${this.props.location}...`);
    ActionCreators.removeLocation(this.props.location);
  },
  render() {
    let {location} = this.props;
    return (
      <div className="item">
        <a className="ui large orange label">
          <i className="marker icon"></i>
          {location}
          <i className="delete icon" onClick={this._onRemoveLocation}></i>
        </a>
      </div>
    );
  }
});

export default LocationItem;
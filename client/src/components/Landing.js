"use strict";

import React from 'react';
import {Link} from 'react-router';
import AppStore from '../stores/AppStore';
import ActionCreators from '../actions/AppActionCreators';

const Landing = React.createClass({
  displayName: "Landing",
  _onAdd() {
    ActionCreators.addLocation(this.refs.locationInput.value);
    this.refs.locationInput.value = "";
  },
  _onLocationInputChange(evt) {
    this.setState({
      hasAddDisabled: !evt.target.value || evt.target.value == ""
    });
  },
  _onChange() {
    this.setState({locations: AppStore.getLocations()});
  },
  getInitialState() {
    return {hasAddDisabled: true, locations: AppStore.getLocations()};
  },
  componentDidMount() { 
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  },
  render() {
    let {hasAddDisabled, locations} = this.state;
    console.log(locations);
    return (
      <div className="ui white vertical segment">
        <div className="ui container main">
          <div className="ui vertical segment">
            <div className="ui large action input">
              <input type="text" placeholder="Enter a location..." ref="locationInput" onChange={this._onLocationInputChange}/>
                <button className={"ui orange large icon button"  + (hasAddDisabled ? " disabled" : "")} onClick={this._onAdd}>
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
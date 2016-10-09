"use strict";

import React from 'react';
import {Link} from 'react-router';
import AppStore from '../stores/AppStore';
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
        <a className="ui large pink label">
          <i className="marker icon"></i>
          {location}
          <i className="delete icon" onClick={this._onRemoveLocation}></i>
        </a>
      </div>
    );
  }
});

const Landing = React.createClass({
  displayName: "Landing",
  _onAdd() {
    ActionCreators.addLocation(this.refs.locationInput.value);
    this.refs.locationInput.value = "";
    this.setState({hasAddDisabled: true});
  },
  _onLocationInputChange(evt) {
    let {value} = evt.target;
    let {locations} = this.state;
    let disabled = !value || value == "" || locations.indexOf(value) >= 0;
    this.setState({
      hasAddDisabled: disabled
    });
  },
  _onChange() {
    this.setState({locations: AppStore.getLocations()});
  },
  _onLocationInputKeyPress(target) {
    if (!this.state.hasAddDisabled && target.charCode == 13)
      this._onAdd();
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
    let locationItems = locations.map((it, idx) => {
      return (<LocationItem key={idx} location={it} />);
    });
    return (
      <div className="ui white vertical segment">
        <div className="ui container main">
          <div className="ui vertical segment">
            <div className="ui large action input">
              <input type="text" placeholder="Enter a location..." ref="locationInput" onChange={this._onLocationInputChange}
                onKeyPress={this._onLocationInputKeyPress}/>
              <button className={"ui orange large icon button"  + (hasAddDisabled ? " disabled" : "")} onClick={this._onAdd}>
                <i className="plus icon" />
              </button>
            </div>
          </div>
          <div className="ui vertical segment">
            <div className="ui large horizontal divided list">
              {locationItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Landing;
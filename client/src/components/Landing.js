"use strict";

import React from 'react';
import {Link} from 'react-router';
import AppStore from '../stores/AppStore';
import ActionCreators from '../actions/AppActionCreators';
import LocationItem from './LocationItem';

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
  _onCheckClick() {
    ActionCreators.checkWeather(this.state.locations);
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
    let hasSubmitDisabled = !locations || locations.length === 0;
    return (
      <div className="ui white vertical segment">
        <div className="ui container main">
          <div className="ui vertical segment">
            <div className="ui large action input">
              <input type="text" placeholder="Enter location..." ref="locationInput" onChange={this._onLocationInputChange}
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
            <button className={"md-btn" + (hasSubmitDisabled ? " disabled" : "")} type="button" onClick={this._onCheckClick}>
              <span>Check weather</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default Landing;
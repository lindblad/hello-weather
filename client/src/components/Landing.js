"use strict";

import React from 'react';
import {Link} from 'react-router';
import AppStore from '../stores/AppStore';

const Landing = React.createClass({
  displayName: "Landing",
  _onAdd() {
    console.log(this.refs.locationInput.value);
  },
  _onChange(evt) {
    this.setState({
      hasAddDisabled: !evt.target.value || evt.target.value == ""
    });
  },
  getInitialState() {
    return {hasAddDisabled: true};
  },
  render() {
    let {hasAddDisabled} = this.state;
    return (
      <div className="ui white vertical segment">
        <div className="ui container main">
          <div className="ui raised segment">
            <div className="ui action input">
              <input type="text" placeholder="Enter a location..." ref="locationInput" onChange={this._onChange}/>
                <button className={"ui blue icon button"  + (hasAddDisabled ? " disabled" : "")} onClick={this._onAdd}>
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
"use strict";

import React from 'react';
import Store from '../stores/AppStore';

const Header = React.createClass({
  displayName: "Header",
  render() {
    let {user, location, title} = this.props;
    let name = user.name && user.name != "" ? user.name : user.displayName; 
    return (
      <header className="ui yellow inverted vertical segment app-header">
        <div className="ui grid">
          <div className="two wide column">
          </div>
          <div className="middle aligned eleven wide column">
            <h1 className="ui header">{title}</h1>
          </div>
          <div className="middle aligned two wide column">
            <div className="item">
              <div className="ui image">
                <img className="user photo" src={user.photo} alt=""/>
              </div>
              <div className="content">
                <a className="user name">{name}</a>
              </div>
            </div>
          </div>
          <div className="one wide column">
          </div>
        </div>
      </header>
    );
  }
});

export default Header;
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
          <div className="one wide column">
          </div>
          <div className="middle aligned ten wide column">
            <div className="ui header">{title}</div>
          </div>
          <div className="middle aligned five wide column">
            <img className="ui bottom aligned image user photo" 
              src={user.photo} alt=""/>
          </div>
        </div>
      </header>
    );
  }
});

export default Header;
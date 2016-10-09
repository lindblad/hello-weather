"use strict";

import React from 'react';
import Store from '../stores/AppStore';

const Header = React.createClass({
  displayName: "Header",
  render() {
    let {user, location, title} = this.props;
    let name = user.name && user.name != "" ? user.name : user.displayName; 
    return (
      <header className="ui yellow inverted vertical segment app-header clearfix">
        <div className="ui header">{title}</div>
        <img className="ui image user photo" 
          src={user.photo} alt=""/>
      </header>
    );
  }
});

export default Header;
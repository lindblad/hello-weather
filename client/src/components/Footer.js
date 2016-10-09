"use strict";

import React from 'react';

const Footer = React.createClass({
  displayName: "Footer",
  render: function() {
    let {title} = this.props;
    return (
      <footer className="ui vertical blue inverted segment app-footer">
        <div className="ui container">
          <div className="ui grid">
            <div className="three wide column">
            </div>
            <div className="thirteen wide column">
              <h2 className="ui header">      
              </h2>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

export default Footer;
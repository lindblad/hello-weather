"use strict";

import React from 'react';

const ResultItem = React.createClass({
  displayName: "ResultItem",
  render() {
    let {location, result} = this.props;
    return (
      <div className="ui raised card">
        <div className="content">
          <div className="header">
            {`${result.name},${result.sys.country}`}
          </div>
          <div className="meta">{`(lon: ${result.coord.lon} lat: ${result.coord.lat})`}</div>
          <div className="meta">
            <a>{`${result.weather[0].description} icon ${result.weather[0].icon}`}</a>
          </div>
        </div>
        <div className="content left aligned">
          <div className="description">
            <div>{`Temperature: ${result.main.temp}`}</div>
            <div>{`Pressure: ${result.main.pressure}`}</div>
            <div>{`Humidity: ${result.main.humidity}`}</div>
            <div>{`Wind: ${result.wind.speed} m/s, ${result.wind.deg} deg`}</div>
            <div>{`Humidity: ${result.main.humidity}`}</div>
          </div>
        </div>
      </div>
    );
  }
});

export default ResultItem;
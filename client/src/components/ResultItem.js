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
            &nbsp;&nbsp;&nbsp;{`${result.main.temp}`}&deg;C
          </div>
          <div className="ui tiny image">
            <img src={`http://openweathermap.org/img/w/${result.weather[0].icon}.png`} alt=""/>
          </div>
          <span className="meta">
            <a>{`${result.weather[0].description}`}</a>
          </span>
        </div>
        <div className="content left aligned">
          <div className="description">
            <div>{`Pressure: ${result.main.pressure}hpa`}</div>
            <div>{`Humidity: ${result.main.humidity}%`}</div>
            <div>{`Wind: ${result.wind.speed} m/s, ${result.wind.deg}`}&deg;</div>
          </div>
        </div>
      </div>
    );
  }
});

export default ResultItem;
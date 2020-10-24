import React from "react";

function WeatherInfo(props) {
  const data = props.data;

  function capitalize(str) {
    const firstChar = str.charAt(0);
    return firstChar.toUpperCase() + str.slice(1);
  }

  return (
    <div className="weather-info-container">
      <div className="location">
        <p className="city">{props.city}</p>
        <p className="country">{props.country}</p>
      </div>
      <div className="stat-container">
        <div className="temp">
          <p className="temp-stat">
            {data.temp}
            {props.unitText}
          </p>
          <p className="feels-like">
            Feels like: {data.feelsLike}
            {props.unitText}
          </p>
        </div>
        <div className="image">
          <img
            src={
              data
                ? `http://openweathermap.org/img/wn/${data.icon}@2x.png`
                : null
            }
            alt="weather icon"
            className="weather-icon"
          />
          <p className="description">
            {data ? capitalize(data.description) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;

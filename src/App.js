import React from "react";
import Header from "./components/Header";
import WeatherInfo from "./components/WeatherInfo";
import { Button } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "London",
      country: "",
      weatherData: "",
      isImperial: false,
      unitText: "°C",
    };
  }

  fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=${
      this.state.isImperial ? "imperial" : "metric"
    }&q=${this.state.city}&appid=${API_KEY}`;
    let weatherData = {};
    let countryData = "";
    let city = "";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        weatherData = {
          cityName: response.name,
          temp: Math.round(parseFloat(response.main.temp)),
          country: response.sys.country,
          description: response.weather[0].description,
          icon: response.weather[0].icon,
          feelsLike: Math.round(parseFloat(response.main.feels_like)),
        };
        city = response.name;
      })
      .then(() => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${weatherData.country}`)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            countryData = response;
            this.setState({
              weatherData: weatherData,
              city: city,
              country: countryData.name,
            });
          });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = () => {
    if (this.state.city.length > 0) {
      this.fetchData();
    }
  };

  componentDidMount = () => {
    this.fetchData();
  };

  switchUnits = () => {
    this.setState((prevState) => {
      return {
        isImperial: !prevState.isImperial,
      };
    });
  };

  convertUnits = (isImperial) => {
    function cToF(temp) {
      const celcius = parseFloat(temp);
      const fahrenheit = Math.round(celcius * 1.8 + 32);
      return fahrenheit;
    }

    function fToC(temp) {
      const fahrenheit = parseFloat(temp);
      const celcius = Math.round((fahrenheit - 32) / 1.8);
      return celcius;
    }

    if (isImperial) {
      const temp = cToF(this.state.weatherData.temp);
      const feelsLike = cToF(this.state.weatherData.feelsLike);

      this.setState((prevState) => {
        return {
          weatherData: {
            ...prevState.weatherData,
            temp: temp,
            feelsLike: feelsLike,
          },
          unitText: "°F",
        };
      });
    } else {
      const temp = fToC(this.state.weatherData.temp);
      const feelsLike = fToC(this.state.weatherData.feelsLike);

      this.setState((prevState) => {
        return {
          weatherData: {
            ...prevState.weatherData,
            temp: temp,
            feelsLike: feelsLike,
          },
          unitText: "°C",
        };
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.isImperial !== this.state.isImperial) {
      this.convertUnits(this.state.isImperial);
    }
  };

  render() {
    return (
      <div>
        <Header
          switchUnits={this.switchUnits}
          isImperial={this.state.isImperial}
        />
        <div className="container">
          <div className="search-div">
            <input
              className="city-input"
              type="text"
              name="city"
              placeholder="Name of City"
              onChange={this.handleChange}
              value={this.state.city}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              Search
            </Button>
          </div>
          <WeatherInfo
            data={this.state.weatherData}
            country={this.state.country}
            city={this.state.city}
            unitText={this.state.unitText}
          />
        </div>
      </div>
    );
  }
}

export default App;

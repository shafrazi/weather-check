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
      temp: "",
      weatherCondition: "",
    };
  }

  fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.state.city}&appid=${API_KEY}`;
    let weatherData = {};
    let countryData = "";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        weatherData = {
          cityName: response.name,
          temp: response.main.temp,
          country: response.sys.country,
          description: response.weather[0].description,
          icon: response.weather[0].icon,
          feelsLike: response.main.feels_like,
        };
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
              country: countryData.name,
              city: "",
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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <Header />
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
          />
        </div>
      </div>
    );
  }
}

export default App;

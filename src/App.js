import React from "react";
import Header from "./components/Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Header />
        <h1>Weather App</h1>
      </div>
    );
  }
}

export default App;

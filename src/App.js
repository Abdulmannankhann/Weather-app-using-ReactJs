import "./App.css";
import * as axios from "axios";
import React, { useState, useEffect } from "react";
import img1 from "./assets/sunset.jpg";
import img2 from "./assets/cold.jpg";
import img3 from "./assets/weather.jpg";

function App() {
  let img = "";
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=e0d8abb20e9b0b2f8a7bb365a8910b0d`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  useEffect(() => {
    img = img3;
    console.log(img);
  }, []);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${
          data.main === undefined
            ? img3
            : data.main.temp.toFixed() >= 35
            ? img1
            : img2
        })`,
        backgroundPosition: `centre`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "all 1s ease-in-out",
      }}
    >
      <div className="search">
        <input
          type="text"
          value={location}
          placeholder="Enter location..."
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity.toFixed()}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

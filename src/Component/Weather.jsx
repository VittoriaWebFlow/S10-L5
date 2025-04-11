import React, { useState } from "react";
import "./Header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const API_KEY = "c399fba5369c3ecf1bb3158e1137b374";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  return (
    <section className="header-section">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col-md-6">
            <div className="me-5">
              <i class="bi bi-geo-alt"></i>
              <span>London, UK</span>
            </div>
            <div className="ms-5">
              <i class="bi bi-search"></i>
              <input
                className="text-light"
                type="text"
                placeholder="Search here"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyDown={searchLocation}
              />
            </div>
            <div className="ms-5">
              <i class="bi bi-calendar-date ms-5 text-black"></i>
              <i class="bi bi-bell"></i>
            </div>
          </div>
          {data && (
            <div className="col-md-6 weather-card">
              <h2>Weather in {data.name}</h2>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
              <p>Description: {data.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;

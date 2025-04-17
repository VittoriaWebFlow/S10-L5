import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Torino");
  const apiKey = "c399fba5369c3ecf1bb3158e1137b374";

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
        );
        if (res.ok) {
          const resJson = await res.json();
          setCity(resJson);
        } else {
          console.error("Error fetching data:", res.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if (search) {
      fetchApi();
    }
  }, [search, apiKey]);

  return (
    <>
      <Container fluid={true}>
        <Row className="align-items-center">
          <Col xs={12} md={10} lg={12}>
            <section className="header-section d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center d-none d-lg-block">
                <i class="bi bi-geo-alt"></i>
                <span className="ms-2 me-3">London, UK</span>
              </div>
              <div className="d-flex align-items-center w-75 ">
                <input
                  type="text"
                  className="search text-center text-black rounded-2 w-100"
                  placeholder="Search for a city"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex align-items-center d-none d-lg-block">
                <i class="bi bi-calendar-date ms-3"></i>
                <i class="bi bi-bell ms-2"></i>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mt-5">
              {city ? (
                <div className="info">
                  <h2 className="location mb-4 mt-1">
                    <i class="fas fa-street-view mt-5"></i> {search}
                  </h2>
                  <h1 className="temp mb-4">{city.main.temp}°C</h1>
                  <h3 className="tempmin_max mb-4">
                    Min: {city.main.temp_min}°C / Max: {city.main.temp_max}°C
                  </h3>
                  <p className="humidity mb-4 fs-4">
                    Humidity: {city.main.humidity}%
                  </p>
                  <p className="wind-speed fs-4">
                    Wind Speed: {city.wind.speed} m/s
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="weather-icon"
                  />
                </div>
              ) : (
                <p>Search for a city</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tempapp;

import { useEffect, useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

import searchIcon from "./assets/searchicon.png";
import clearNightIcon from './assets/few-clouds.png';
import clearIcon from "./assets/sun.png";
import cloudNightIcon from './assets/clear-night.png';
import cloudIcon from "./assets/cloud.png";
import scaterdIcon from './assets/scatered-day.png';
import showerDay from './assets/sun-shower.png';
import showerNight from './assets/night-shower.png';
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/heavy-rain.png";
import nightRain from './assets/night-rain.png';
import nightThunder from './assets/thunder-night.png';
import dayThunder from './assets/thunder-day.png';
import windIcon from "./assets/air.png";
import snowIcon from "./assets/snow.png";
import mistDay from './assets/mist-day.png';
import snowNight from './assets/snow-night.png';
import humidityIcon from "./assets/humidity.png";
import { use } from "react";

const WeatherDetails = ({
  icon,
  temp,
  city,
  nation,
  lat,
  long,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{nation}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidityIcon} alt="" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={windIcon} alt="" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.prototype = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
};
function App() {
  let api_key = "873b107fed8cccf00e03986c71d39f70";

  const [text, setText] = useState("Chennai");

  const [icons, setIcons] = useState(snowIcon);
  const [temparature, setTemparature] = useState(0);
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [citNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearNightIcon,
    "02d": cloudIcon,
    "02n": cloudNightIcon,
    "03d": drizzleIcon,
    "03n": scaterdIcon,
    "04d": drizzleIcon,
    "04n": scaterdIcon,
    "09d": showerDay,
    "09n": showerNight,
    "010d": rainIcon,
    "010n": nightRain,
    "011d": dayThunder,
    "011n":nightThunder,
    "013d": snowIcon,
    "013n": snowNight,
    "050d":mistDay,
  };

  const search = async () => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemparature(Math.floor(data.main.temp));
      setLocation(data.name);
      setCountry(data.sys.country);
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcons(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occured while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="heading">Weather app</h1>
        <div className="input-container">
          <input
            type="text"
            className="city-input"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>

        {loading && <div className="loading-mesaage"> Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {citNotFound && <div className="city-not-found"> City Not Found</div>}

        {!loading && !citNotFound && (
          <WeatherDetails
            icon={icons}
            temp={temparature}
            city={location}
            nation={country}
            lat={latitude}
            long={longitude}
            humidity={humidity}
            wind={wind}
          />
        )}

        <p className="copyright">Designed by Heamachandran</p>
      </div>
    </>
  );
}

export default App;

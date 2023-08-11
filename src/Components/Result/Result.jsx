import React from "react";
import {
  BsFillCloudPlusFill,
  BsFillSunriseFill,
  BsFillSunsetFill,
  BsToggle2On,
  BsWind,
  BsFillCloudRainFill,
  BsMoisture
  
} from "react-icons/bs";
import {WiHumidity,} from "react-icons/wi";
import {FaTemperatureHigh,FaSun} from "react-icons/fa";
import Temperature from "./Temperature";
import "./Result.css";

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
function getHumidityIndicator(humidity) {
  if (humidity < 40) {
    return "Bad";
  } else if (humidity > 70) {
    return "Good";
  } else {
    return "Moderate";
  }
}

function getWindSpeedIndicator(speed) {
  if (speed < 5) {
    return "Calm";
  } else if (speed > 15) {
    return "Breezy";
  } else {
    return "Moderate";
  }
}

function getUVIndexIndicator(uvIndex) {
  if (uvIndex < 3) {
    return "Low";
  } else if (uvIndex < 6) {
    return "Moderate";
  } else if (uvIndex < 8) {
    return "High";
  } else if (uvIndex < 11) {
    return "Very High";
  } else {
    return "Extreme";
  }
}

function Result({ weatherData }) {
  if (!weatherData.weather || !weatherData.main || !weatherData.sys) {
    // Handle loading or missing data state
    return <div className="load">Enter Your City Name</div>;
  }

  const weather = weatherData.weather[0];
  const main = weatherData.main;
  const sys = weatherData.sys;
  const wind = weatherData.wind;

  const sunrise = formatTime(sys.sunrise);
  const sunset = formatTime(sys.sunset);
  const todayDate = formatDate(weatherData.dt);

  const humidity = main.humidity;
  const humidityIndicator = getHumidityIndicator(humidity);

  const windSpeed = wind.speed;
  const windSpeedIndicator = getWindSpeedIndicator(windSpeed);

  const precipitation = main.precipitation || 0;

const uvIndex = main.uvi || 0;
const uvIndexIndicator = getUVIndexIndicator(uvIndex);

const feelsLike = main.feels_like;

const chanceOfRain = weatherData.rain?.["1h"] !== undefined ? weatherData.rain["1h"] : 0;


  const hourlyTemps = weatherData.hourly
    ? weatherData.hourly.map((hour) => hour.temp)
    : [];

  return (
    <div className="main-box">
      <div className="lightsky">
        <div className="colz">
          <BsFillCloudPlusFill />
          <BsToggle2On />
        </div>
        <div className="city-details">
          <div className="first">
            <div className="city">{weatherData.name}</div>
            <div className="sunrise time">
              <BsFillSunriseFill /> {sunrise}
            </div>
          </div>
          <div className="second">
            <div className="date">{todayDate}</div>
            <div className="sunset time">
              <BsFillSunsetFill /> {sunset}
            </div>
          </div>
        </div>
        <div className="temp-details">
          <div className="temp">{Math.round(main.temp)}°</div>
          <div className="sky-status" style={{ fontSize: '26px' }}>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt=""
              />
            </div >
            {weather.main}
          </div>
        </div>
      </div>
      <div className="data">
        <div className="intro">
          <div className="data-left">
            <div className="tag1">Welcome Back, Sanjeev</div>
            <div className="tag2">Check out today's weather info</div>
          </div>
          <div className="time-graph">
            <div className="graph-title">Upcoming Hours</div>
            <Temperature hourlyTemps={hourlyTemps} />
          </div>
          <div className="info">More details of today's weather</div>
          <div className="container">
            <div className="cols">
              <div className="col-title"> Humidity  <WiHumidity/></div>
              <div className="col-value">{humidity}%</div>
              <div
                className={`col-indicator ${humidityIndicator.toLowerCase()}`}
              >
                {humidityIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title">Wind <BsWind/></div>
              <div className="col-value">{windSpeed} km/h</div>
              <div
                className={`col-indicator ${windSpeedIndicator.toLowerCase()}`}
              >
                {windSpeedIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title">Precipitation <BsMoisture/></div>
              <div className="col-value">{precipitation} cm</div>
            </div>
            <div className="cols">
              <div className="col-title">UV Index <FaSun/></div>
              <div className="col-value">{uvIndex}</div>
              <div
                className={`col-indicator ${uvIndexIndicator.toLowerCase()}`}
              >
                {uvIndexIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title">Feels like  <FaTemperatureHigh/></div>
              <div className="col-value">{feelsLike}°</div>
            </div>
            <div className="cols">
              <div className="col-title">Chance of Rain <BsFillCloudRainFill/></div>
              <div className="col-value">{chanceOfRain}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;

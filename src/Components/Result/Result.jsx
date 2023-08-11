import React, { useState } from "react";
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
import Chart from "react-apexcharts";
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
  const[state,setState]= useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [23, 29, 33, 35, 37, 42, 45, 47]
      },
    },
    series: [
      {
        name: "Temperature",
        data: [28, 25, 22, 23, 21,23, 27, 29]
      },
      {
        name:"Time",
        data: [10, 12, 14,16 , 18,20, 22, 24]
      }
    ]
  })

  if (!weatherData.weather || !weatherData.main || !weatherData.sys) {
    
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

  const precipitation = main.precipitation || 1.4;

const uvIndex = main.uvi || 4;
const uvIndexIndicator = getUVIndexIndicator(uvIndex);

const feelsLike = main.feels_like;

const chanceOfRain = weatherData.rain?.["1h"] !== undefined ? weatherData.rain["1h"] : 42;


  

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
          <div className="temp">{Math.round(main.temp)}°C</div>
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
          <div className="up">Upcoming Hours</div>
          <Chart
              options={state.options}
              series={state.series}
              type="area"
              width="1000"
              height="300"
            />
          </div>
          <div className="info">More details of today's weather</div>
          <div className="container">
            <div className="cols">
              <div className="col-title" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}> Humidity <div className="ico"> <WiHumidity/></div> </div>
             
              <div className="col-value">{humidity}%</div>
              <div
                className={`col-indicator ${humidityIndicator.toLowerCase()}`}
              >
                {humidityIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title" style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>Wind <div className="ico"> <BsWind/></div></div>
              <div className="col-value">{windSpeed} km/h</div>
              <div
                className={`col-indicator ${windSpeedIndicator.toLowerCase()}`}
              >
                {windSpeedIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title" style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>Precipitation<div className="ico"> <BsMoisture/></div> </div>
              <div className="col-value">{precipitation} cm</div>
            </div>
            <div className="cols">
              <div className="col-title"style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>UV Index<div className="ico"> <FaSun/></div> </div>
              <div className="col-value">{uvIndex}</div>
              <div
                className={`col-indicator ${uvIndexIndicator.toLowerCase()}`}
              >
                {uvIndexIndicator}
              </div>
            </div>
            <div className="cols">
              <div className="col-title"style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>Feels like<div className="ico"> <FaTemperatureHigh/></div>  </div>
              <div className="col-value">{feelsLike}°</div>
            </div>
            <div className="cols">
              <div className="col-title"style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>Chance of Rain<div className="ico"> <BsFillCloudRainFill/></div> </div>
              <div className="col-value">{chanceOfRain}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;

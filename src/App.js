import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Search from './Components/Search/Search';
import Result from './Components/Result/Result';
import Footer from "./Components/Footer/Footer";
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);

  const changeSearch = (value) => {
    setSearch(value);
  }

  const getWeatherData = () => {
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e733ecd5ae8a7cd7df3bf03cbbbbe2e5&units=metric`
    )
    .then((response) => {
      console.log(response.data);
      setWeather(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const searchWeatherHandler = () => {
    if (search !== "") {
      getWeatherData();
    }
  }

  useEffect(() => {
    if (search !== "") {
      getWeatherData();
    }
  }, [search]);

  return (
    <div className="App">
      <Search searchData={search} eventHandler={changeSearch} searchWeather={searchWeatherHandler} />
      <Result weatherData={weather} />
      <Footer/>
    </div>
  );
}

export default App;

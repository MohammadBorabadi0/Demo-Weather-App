import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import WeatherForm from "./WeatherForm";

// Actions
import { CLEAR, WEATHER_ERROR, WEATHER_LOADING } from "../actions";

// Context
import { useWeather } from "../Provider/weather_context";

// Icons
import { GoLocation } from "react-icons/go";

const Weather = () => {
  const { dispatch, weather_error, errorMsg, weatherData } = useWeather();
  const [city, setCity] = useState("");
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef();

  const weather = weatherData[weatherData.length - 1];
  let id;
  let icon;
  if (weather) {
    id = weather["data"].weather[0].id;
  }

  if (id === 800) {
    icon = "assets/images/clear.svg";
  } else if (id >= 200 && id <= 232) {
    icon = "assets/images/storm.svg";
  } else if (id >= 600 && id <= 622) {
    icon = "assets/images/snow.svg";
  } else if (id >= 701 && id <= 781) {
    icon = "assets/images/haze.svg";
  } else if (id >= 801 && id <= 804) {
    icon = "assets/images/cloud.svg";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    icon = "assets/images/rain.svg";
  }

  const fetchWeather = async (city) => {
    const apiKey = "13feae2d165a31f6a33f25f0e197b406";
    dispatch({ type: WEATHER_LOADING });
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      return dispatch({ type: "FETCH_DATA", payload: data });
    } catch (err) {
      console.log(err.message);
      setShowResult(false);
      dispatch({ type: WEATHER_ERROR, payload: "This city not found !!!" });
    }
  };

  useEffect(() => {
    if (!showResult) inputRef.current.focus();
  }, [inputRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      alert("City Name Must Not Empty !!!");
      return;
    }

    fetchWeather(city);
    setShowResult(true);
    setCity("");
  };

  if (!showResult) {
    return (
      <WeatherForm
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        weather_error={weather_error}
        errorMsg={errorMsg}
        city={city}
        setCity={setCity}
        setShowResult={setShowResult}
      />
    );
  } else {
    return (
      <>
        <div className="text-white w-full">
          <button
            className="bg-gray-500 ml-8 px-2 py-1 rounded-sm font-semibold"
            onClick={() => {
              setShowResult(false);
              dispatch({ type: CLEAR });
            }}
          >
            Search For Places
          </button>
        </div>
        {weather && (
          <div className="flex flex-col items-center gap-8 text-white mt-8 md:mt-4">
            <div className="w-40">
              <img src={icon} alt={weather["data"].name} />
            </div>
            <p className="text-6xl font-semibold flex items-end gap-1">
              {Math.floor(weather["data"].main["temp"])}
              <span className="text-2xl font-thin">&deg;C</span>
            </p>
            <div>
              <h4 className="text-3xl">
                {weather["data"].weather[0].description}
              </h4>
            </div>
            <div>
              <span className="text-xl">Today</span>
            </div>
            <div className="flex items-center gap-1 text-xl text-gray-400 font-semibold">
              <div className="flex items-center">
                <GoLocation />
              </div>
              <span>{weather["data"].name},</span>
              <p>{weather["data"].sys["country"]}</p>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Weather;

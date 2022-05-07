import React, { createContext, useContext, useReducer } from "react";
import { FETCH_DATA, WEATHER_ERROR, WEATHER_LOADING } from "../actions";

const initialState = {
  weatherData: [],
  weather_loading: false,
  weather_error: false,
  errorMsg: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case WEATHER_LOADING: {
      return { ...state, weather_loading: true };
    }
    case FETCH_DATA: {
      const updatedWeather = [...state.weatherData];
      const data = { id: new Date().getTime(), data: { ...action.payload } };
      updatedWeather.push(data);
      return {
        ...state,
        weather_loading: false,
        weatherData: updatedWeather,
        weather_error: false,
        errorMsg: null,
      };
    }
    case WEATHER_ERROR: {
      return {
        ...state,
        weather_loading: false,
        weather_error: true,
        errorMsg: action.payload,
        weatherData: [],
      };
    }
    default: {
      return state;
    }
  }
};

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WeatherContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;

export const useWeather = () => useContext(WeatherContext);

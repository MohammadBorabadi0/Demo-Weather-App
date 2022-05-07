import React from "react";

// Icons
import { MdOutlineClose } from "react-icons/md";
import { useWeather } from "../Provider/weather_context";

const WeatherForm = ({
  handleSubmit,
  inputRef,
  city,
  setCity,
  setShowResult,
}) => {
  const { weather_error, errorMsg, weather_loading } = useWeather();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-[90%] xl:w-[80%]"
    >
      <span
        className="absolute top-1.5 right-1.5 text-white text-xl"
        onClick={() => {
          setShowResult(true);
        }}
      >
        <MdOutlineClose />
      </span>
      <div>
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 focus:outline-none font-semibold text-sm sm:text-base lg:text-lg rounded-sm px-1 lg:px-4 py-1.5"
        />
        <button
          type="submit"
          className="bg-blue-200 text-sm sm:text-base lg:text-lg font-semibold rounded-sm px-1 lg:px-4 py-1.5 ml-1"
        >
          Search
        </button>
      </div>
      {weather_error && (
        <div className="bg-red-300 border border-red-900 w-fit px-4 py-1 mt-4 rounded-sm">
          <span className="text-red-900">{errorMsg}</span>
        </div>
      )}
      {weather_loading && (
        <div className="bg-green-300 border border-green-900 w-fit px-4 py-1 mt-4 rounded-sm">
          <h3>Loading...</h3>
        </div>
      )}
    </form>
  );
};

export default WeatherForm;

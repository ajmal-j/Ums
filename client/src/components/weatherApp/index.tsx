import { useState } from "react";
import { WeatherHeader } from "../header/header.tsx";
import { Button } from "../getCurrentButton/button.tsx";
import Search from "../search/search.tsx";
import CurrentWeather from "../current-weather/current-weather.tsx";
import { Forecast } from "../forecast/forecast.tsx";
import { weatherUrl, weather_key } from "../../utils/helper/api.ts";

function WeatherApp() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData: any) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );
    const forecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLocationButtonClick = (location: any) => {
    handleOnSearchChange(location);
  };
  return (
    <div className='containerMain bg-violet-200 min-h-screen'>
      <div className="container mx-auto max-w-[1000px]">
      <WeatherHeader />
      <div className='searchContainer'>
        <Search onSearchChange={handleOnSearchChange} />
        <Button onButtonClick={handleLocationButtonClick} />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default WeatherApp;

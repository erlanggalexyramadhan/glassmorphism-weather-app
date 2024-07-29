"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from "../utils/Icons";
import { kelvinToCelsius } from "../utils/misc";
import moment from "moment";

interface Weather {
  main: string;
  description: string;
}

interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
}

interface Forecast {
  main: Main;
  timezone: number;
  name: string;
  weather: Weather[];
}

const Temperature = () => {
  const { forecast } = useGlobalContext() as { forecast: Forecast };

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    if (forecast?.timezone) {
      const interval = setInterval(() => {
        const localMoment = moment().utcOffset(forecast.timezone / 60);
        const formattedTime = localMoment.format("HH:mm:ss");
        const day = localMoment.format("dddd");

        setLocalTime(formattedTime);
        setCurrentDay(day);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [forecast?.timezone]);

  if (!forecast || !forecast.weather) {
    return <div>Loading...</div>;
  }

  const { main, timezone, name, weather } = forecast;
  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Cloudy":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 pb-5 px-4 rounded-lg flex flex-col justify-between bg-transparent backdrop-blur-xl">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
};

export default Temperature;

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "../utils/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import moment from "moment";
import { kelvinToCelsius } from "../utils/misc";

function DailyForecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!forecast || !weather) {
    return <Skeleton className="h-48 w-full" />;
  }

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const todaysForecast = list.filter(
    (forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }
  );

  const { main: weatherMain } = weather[0];

  if (todaysForecast.length < 1) {
    return (
      <Skeleton className="h-48 w-full col-span-full md:col-span-2 xl:col-span-2" />
    );
  }

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
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  return (
    <div className="pt-6 px-4 h-48 rounded-lg bg-transparent backdrop-blur-xl flex flex-col gap-8 col-span-full md:col-span-2 xl:col-span-2">
      <div className="h-full flex gap-10 overflow-hidden">
        {todaysForecast.length < 1 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-5xl line-through text-rose-500">
              No Data Available!
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todaysForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                      >
                        <p className="text-gray-300">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p>{kelvinToCelsius(forecast.main.temp)}°C</p>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;

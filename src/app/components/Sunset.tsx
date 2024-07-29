"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../context/globalContext";
import { unixToTime } from "../utils/misc";
import { sunset } from "../utils/Icons";

function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast.sys?.sunset) {
    return <Skeleton className="h-48 w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timnezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timnezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timnezone);
  return (
    <div className="pt-6 pb-5 px-4 h-48 rounded-lg flex flex-col gap-8 bg-transparent backdrop-blur-xl">
      <div>
        <h2 className="flex items-center gap-2 font-medium">{sunset}Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>

      <p>Sunrise: {sunrise}</p>
    </div>
  );
}

export default Sunset;

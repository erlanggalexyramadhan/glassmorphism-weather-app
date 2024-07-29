"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../context/globalContext";
import { thermo } from "../utils/Icons";
import { Progress } from "@/components/ui/progress";
import { airQualityIndexText } from "../utils/misc";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return <Skeleton className="h-4 w-full col-span-2 md:col-span-full" />;
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find((item: any) => {
    return item.rating === airQualityIndex;
  });
  return (
    <div className="air-pollution pt-6 px-4 h-48 rounded-lg flex flex-col gap-8 bg-transparent backdrop-blur-xl col-span-full md:col-span-2 xl:col-span-2">
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p>Air quality is {filteredIndex?.description}.</p>
    </div>
  );
}

export default AirPollution;

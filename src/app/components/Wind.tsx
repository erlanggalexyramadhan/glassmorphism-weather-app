"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "../context/globalContext";
import { wind } from "../utils/Icons";
import Image from "next/image";

const Wind = () => {
  const { forecast } = useGlobalContext();

  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (windSpeed === undefined || windDir === undefined) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-48 rounded-lg flex flex-col gap-3 bg-transparent backdrop-blur-xl">
      <h2 className="flex items-center gap-2 font-medium">{wind} Wind</h2>
      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
          />
        </div>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm dark:text-white font-medium">{Math.round(windSpeed)} m/s</p>
      </div>
    </div>
  );
}

export default Wind;

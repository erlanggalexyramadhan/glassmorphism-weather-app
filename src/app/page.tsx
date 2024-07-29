"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import Temperature from "./components/Temperature";
import AirPollution from "./components/AirPollution";
import Sunset from "./components/Sunset";
import Wind from "./components/Wind";
import FiveDayForecast from "./components/FiveDayForecast";
import { useGlobalContextUpdate } from "./context/globalContext";
import DailyForecast from "./components/DailyForecast";
import Population from "./components/Population";
import FeelsLike from "./components/FeelsLike";
import Humidity from "./components/Humidity";
import UvIndex from "./components/UvIndex";
import Visibility from "./components/Visibility";
import Pressure from "./components/Pressure";
import Mapbox from "./components/Mapbox";
import defaultStates from "./utils/defaultStates";
import Link from "next/link";

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[url('/bg.jpeg')] dark:bg-[url('/darkbg.jpeg')] bg-cover object-cover text-slate-300">
      <div className="mx-4 lg:mx-8 xl:mx-24 2xl:mx-64 m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-72 md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
          <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states pt-6 pb-5 px-4 flex flex-col gap-3 flex-1 rounded-xl bg-transparent backdrop-blur-xl">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <footer className="py-4 flex justify-center pb-8">
        <p className="footer-text text-sm flex items-center gap-1">
          Made by
          <Link
            href="https://github.com/erlanggalexyramadhan"
            target="_blank"
            className=" text-white font-bold"
          >
            Lextronaut
          </Link>
        </p>
      </footer>
    </main>
  );
}

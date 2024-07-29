"use client";

import axios from "axios";
import React, { useContext, createContext, useState, useEffect, ReactNode, ChangeEvent } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

interface GlobalContextType {
  forecast: any;
  airQuality: any;
  fiveDayForecast: any;
  uvIndex: any;
  geoCodedList: any;
  inputValue: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

interface GlobalContextUpdateType {
  setActiveCityCoords: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState<[number, number]>([51.752021, -1.257726]);

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error: any) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error: any) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  const fetchGeoCodedList = async (search: string) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error: any) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  const fetchUvIndex = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error: any) {
      console.error("Error fetching the forecast:", error);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search: string) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};

export const useGlobalContextUpdate = (): GlobalContextUpdateType => {
  const context = useContext(GlobalContextUpdate);
  if (!context) {
    throw new Error("useGlobalContextUpdate must be used within a GlobalContextProvider");
  }
  return context;
};

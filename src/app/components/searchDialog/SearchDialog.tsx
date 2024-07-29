"use client";
import React from "react";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { commandIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const SearchDialog: React.FC = () => {
  const { geoCodedList = [], inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium ease-in-out duration-200 bg-transparent backdrop-blur-xl"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command bg-transparent backdrop-blur-xl py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border bg-transparent backdrop-blur-xl shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a command or search..."
            />
            <ul className="px-3 pb-2">
              <li className="p-2 text-sm text-muted-foreground">
                Suggestions
              </li>
              {geoCodedList.length === 0 ? (
                <li>No Results</li>
              ) : (
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-default ${
                        hoveredIndex === index ? "bg-accent" : ""
                      }`}
                      onClick={() => getClickedCoords(item.lat, item.lon)}
                    >
                      <p className="text">
                        {item.name}, {item.state && item.state + ","}{" "}
                        {item.country}
                      </p>
                    </li>
                  )
                )
              )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
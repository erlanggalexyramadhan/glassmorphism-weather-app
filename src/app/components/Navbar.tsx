"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { ThemeDropdown } from "../providers/themeDropdown/ThemeDropsown";
import { github } from "../utils/Icons";
import SearchDialog from "./searchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { forecast } = useGlobalContext();

  console.log(forecast);

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code flex items-center gap-2 dark:bg-white bg-black"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            {github}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

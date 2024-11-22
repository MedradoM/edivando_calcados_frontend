"use client";

import React from "react";
import HeaderNavigation from "../headerNavigation";
import { IoIosSearch } from "react-icons/io";
import RedesButtons from "../redesButtons";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 shadow-md z-50 bg-white">
      <div className="flex justify-between p-4 items-center">
        <div>
          <p>Edivando calcados</p>
        </div>
        <div className="relative w-3/5 px-5">
          <input
            type="text"
            className="py-2 pl-9 rounded border w-full"
            placeholder="Pesquisar produtos"
          />
          <IoIosSearch className="size-6 absolute inset-0 top-[10px] left-7" />
        </div>
        <RedesButtons />
      </div>
      <div className="w-full flex justify-center gap-6">
        <HeaderNavigation />
      </div>
    </header>
  );
}

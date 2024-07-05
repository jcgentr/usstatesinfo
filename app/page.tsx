"use client";

import Image from "next/image";
import { states } from "./lib/data";
import { useState } from "react";
import { State } from "./lib/definitions";

const sortByFxns = {
  name: (a: State, b: State) => a.name.localeCompare(b.name),
  statehoodDate: (a: State, b: State) =>
    a.statehoodDate.getTime() - b.statehoodDate.getTime(),
  capital: (a: State, b: State) => a.capital.localeCompare(b.capital),
  population: (a: State, b: State) =>
    parseInt(b.population.replace(/,/g, "")) -
    parseInt(a.population.replace(/,/g, "")),
  totalArea: (a: State, b: State) =>
    parseInt(b.totalArea.replace(/,/g, "")) -
    parseInt(a.totalArea.replace(/,/g, "")),
};

export default function Home() {
  const [sortBy, setSortBy] = useState<
    "name" | "statehoodDate" | "capital" | "population" | "totalArea"
  >("name");
  const [searchText, setSearchText] = useState("");

  function handleSearch(e: any) {}

  const sortedStates = states.sort(sortByFxns[sortBy]);
  const filteredStates = sortedStates.filter((s) =>
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main className="bg-slate-900 text-white">
      <div className="p-4 flex justify-between items-center">
        <div>
          <label htmlFor="sortOptions">Sort by</label>
          <select
            id="sortOptions"
            name="sortOptions"
            className="ml-4 rounded text-slate-900"
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.currentTarget.value as
                  | "name"
                  | "statehoodDate"
                  | "capital"
                  | "population"
                  | "totalArea"
              )
            }
          >
            <option value="name">State Name</option>
            <option value="statehoodDate">Statehood Date</option>
            <option value="capital">Capital Name</option>
            <option value="population">Population</option>
            <option value="totalArea">Total Area</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="rounded text-slate-900 px-2"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
        </div>
      </div>
      <ul className="grid grid-cols-auto-fit-minmax">
        {filteredStates.map((state) => (
          <li key={state.id} className="w-auto relative group m-auto">
            <div className="relative flex group-hover:opacity-0 justify-center items-center transition-all duration-300 ease-in">
              <Image
                src={state.imageSrc}
                alt={`${state.name} flag`}
                width={600}
                height={400}
                className="opacity-80"
                data-id={state.id}
              />
              <h1
                className="absolute text-9xl font-black text-shadow"
                style={{ textShadow: "0 0 10px rgba(0, 0, 0, .7)" }}
              >
                {state.id}
              </h1>
            </div>
            <div className="w-full h-full absolute top-0 hidden flex-col gap-1 group-hover:flex p-8 max-w-[38rem]">
              <div className="flex justify-between items-center">
                <div className="text-2xl">{state.name}</div>
                <div className="text-sm">
                  {state.statehoodDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </div>
              </div>
              <h2 className="text-base">Capital: {state.capital}</h2>
              <h3 className="text-sm">Nickname: {state.nickname}</h3>
              <h3 className="text-sm">Bird: {state.bird}</h3>
              <h3 className="text-sm">Population: {state.population}</h3>
              <h3 className="text-sm">Total Area: {state.totalArea} sq mi</h3>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

import Image from "next/image";
import { states } from "./lib/data";

export default function Home() {
  return (
    <main>
      <ul className="grid grid-cols-auto-fit-minmax">
        {states.map((state) => (
          <li key={state.id} className="w-auto relative group bg-black">
            <div className="relative flex group-hover:opacity-0 justify-center items-center transition-all duration-500 ease-in">
              <Image
                src={`images/flags/ar.svg`}
                alt={`${state.name} flag`}
                width={600}
                height={400}
                className="opacity-80"
              />
              <h1
                className="absolute text-9xl font-black text-shadow"
                style={{ textShadow: "0 0 10px rgba(0, 0, 0, .7)" }}
              >
                {state.id}
              </h1>
            </div>
            <div className="absolute top-0 hidden flex-col gap-1 group-hover:flex p-8">
              <h1 className="text-2xl">{state.name}</h1>
              <h2 className="text-base">Capital: {state.capital}</h2>
              <h3 className="text-sm">Nickname: {state.nickname}</h3>
              <h3 className="text-sm">Bird: {state.bird}</h3>
              <h3 className="text-sm">Population: {state.population}</h3>
              <h3 className="text-sm">Total Area: {state.totalArea}</h3>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

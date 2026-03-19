import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
      <div className="container-max flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold">WeatherApp</span>
          <span className="text-sm opacity-80 hidden sm:inline">Szybkie prognozy</span>
        </div>

        <nav className="flex items-center gap-4">
         
        </nav>
      </div>
    </header>
  );
}
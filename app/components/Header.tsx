export default function Header() {
  return (
    <header className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md">
      <div className="container-max flex items-center justify-between gap-3 py-3 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">WeatherApp</span>
          <span className="hidden sm:inline text-xs sm:text-sm opacity-80 truncate">Szybkie prognozy</span>
        </div>

        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] sm:text-xs font-medium backdrop-blur">
          mobile • tablet • desktop
        </span>
      </div>
    </header>
  );
}
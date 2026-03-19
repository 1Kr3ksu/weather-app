export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-r from-sky-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-indigo-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 014-4h1.26A4 4 0 1116 15H6a3 3 0 01-3-3z" />
          </svg>
          <div>
            <div className="font-semibold">WeatherApp</div>
            <div className="text-xs opacity-80">Szybkie prognozy pogody</div>
          </div>
        </div>

        <div className="text-center text-xs opacity-80">© {new Date().getFullYear()} WeatherApp — Wszystkie prawa zastrzeżone</div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 3h7v7M10 14L21 3" />
            </svg>
            WeatherAPI
          </a>

          <a
            href="https://github.com/1Kr3ksu/weather-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
          >
            Repozytorium
          </a>
        </div>
      </div>
    </footer>
  );
}
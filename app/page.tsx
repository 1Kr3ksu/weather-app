"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    is_day: number;
  };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backgroundClass, setBackgroundClass] = useState("bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const apiKey = "3ec7bebea7ca4ccfa0670749250512";

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`
      );
      if (res.ok) {
        const data = await res.json();
        const cities = data.map((item: any) => `${item.name}, ${item.country}`);
        setSuggestions(cities.slice(0, 10)); // Limit to 10 suggestions
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [apiKey]);

  const debouncedFetchSuggestions = useCallback(
    (query: string) => {
      const timeoutId = setTimeout(() => fetchSuggestions(query), 300);
      return () => clearTimeout(timeoutId);
    },
    [fetchSuggestions]
  );

  useEffect(() => {
    const cleanup = debouncedFetchSuggestions(city);
    return cleanup;
  }, [city, debouncedFetchSuggestions]);

  const getBackgroundClass = (condition: string, isDay: number) => {
    const lowerCondition = condition.toLowerCase();
    if (isDay === 0) {
      return "bg-gradient-to-br from-indigo-900 via-purple-900 to-black"; // Noc
    }
    if (lowerCondition.includes("słonecznie") || lowerCondition.includes("bezchmurnie") || lowerCondition.includes("jasno")) {
      return "bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400"; // Słonecznie
    }
    if (lowerCondition.includes("częściowo") || lowerCondition.includes("umiarkowane") || lowerCondition.includes("zachmurzenie")) {
      return "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"; // Częściowo słonecznie
    }
    if (lowerCondition.includes("pochmurno") || lowerCondition.includes("zachmurzenie duże") || lowerCondition.includes("duże")) {
      return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500"; // Pochmurno
    }
    if (lowerCondition.includes("deszcz") || lowerCondition.includes("mżawka") || lowerCondition.includes("przelotny") || lowerCondition.includes("ulewa")) {
      return "bg-gradient-to-br from-gray-400 via-blue-500 to-gray-600"; // Deszcz
    }
    if (lowerCondition.includes("śnieg") || lowerCondition.includes("śnieżny") || lowerCondition.includes("śniegu") || lowerCondition.includes("śnieżycy")) {
      return "bg-gradient-to-br from-blue-100 via-white to-gray-200"; // Śnieg
    }
    if (lowerCondition.includes("burza") || lowerCondition.includes("grom") || lowerCondition.includes("piorun")) {
      return "bg-gradient-to-br from-gray-700 via-purple-800 to-black"; // Burza
    }
    if (lowerCondition.includes("mgła") || lowerCondition.includes("zamglenie") || lowerCondition.includes("mroźna")) {
      return "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"; // Mgła
    }
    return "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black"; // Domyślny
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setBackgroundClass("bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black");
    setShowSuggestions(false); // Hide suggestions on submit

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pl`
      );

      if (!res.ok) throw new Error("Nie znaleziono miasta");

      const data = await res.json();

      setTimeout(() => {
        setWeather(data);
        setBackgroundClass(getBackgroundClass(data.current.condition.text, data.current.is_day));
        setLoading(false);
      }, 1000);

    } catch {
      setError("Nie znaleziono miasta lub wystąpił błąd.");
      setBackgroundClass("bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black");
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cityName = suggestion.split(',')[0].trim();
    setCity(cityName);
    setShowSuggestions(false);
    // Automatically submit the form
    const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
    handleSubmit(fakeEvent);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className={`flex-1 ${backgroundClass}`}>
        <div className="container-max py-6 sm:py-10 md:py-12 space-y-6 sm:space-y-8">
          <section className="w-full">
            <div className="bg-white/95 dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <form className="flex flex-col sm:flex-row gap-3 relative" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Wpisz nazwę miasta"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click on suggestion
                  className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
                />

                <button
                  type="submit"
                  disabled={!city.trim() || loading}
                  className="w-full sm:w-auto px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 font-medium"
                >
                  {loading ? "Ładowanie..." : "Szukaj"}
                </button>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}

              {error && (
                <div className="text-red-500 mt-3 text-center text-sm">
                  {error}
                </div>
              )}
            </div>
          </section>

          <section className="w-full">
            {loading && (
              <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-xl shadow-md text-gray-700 dark:text-gray-300 animate-pulse w-full max-w-2xl mx-auto text-center">
                Ładowanie...
              </div>
            )}

            {!loading && weather && (
              <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl shadow-2xl text-center w-full max-w-2xl mx-auto">
                <div className="text-xl sm:text-2xl font-bold mb-6 break-words">
                  {weather.location.name}, {weather.location.country}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="font-semibold">Temperatura</div>
                    <div className="text-lg font-bold">{weather.current.temp_c}°C</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">☁️</div>
                    <div className="font-semibold">Pogoda</div>
                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                      <Image
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                      {weather.current.condition.text}
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">💧</div>
                    <div className="font-semibold">Wilgotność</div>
                    <div className="text-lg font-bold">{weather.current.humidity}%</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">🌬️</div>
                    <div className="font-semibold">Wiatr</div>
                    <div className="text-lg font-bold">{weather.current.wind_kph} km/h</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">📉</div>
                    <div className="font-semibold">Ciśnienie</div>
                    <div className="text-lg font-bold">{weather.current.pressure_mb} hPa</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-4 py-3 text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="font-semibold">Odczuwalna</div>
                    <div className="text-lg font-bold">{weather.current.feelslike_c}°C</div>
                  </div>
                </div>
              </div>
            )}

          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

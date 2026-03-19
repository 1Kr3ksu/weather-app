"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = "3ec7bebea7ca4ccfa0670749250512";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=pl`
      );

      if (!res.ok) throw new Error("Nie znaleziono miasta");

      const data = await res.json();

      setTimeout(() => {
        setWeather(data);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError("Nie znaleziono miasta lub wystąpił błąd.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black">
        <div className="container-max py-6 sm:py-10 md:py-12 space-y-6 sm:space-y-8">
          <section className="w-full">
            <div className="bg-white/95 dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-2xl mx-auto">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Wpisz nazwę miasta"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
              <div className="text-xl sm:text-2xl font-bold mb-4 break-words">
                {weather.location.name}, {weather.location.country}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
                <span className="text-4xl sm:text-5xl font-bold leading-none">
                  {weather.current.temp_c}°C
                </span>

                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>

              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4">
                {weather.current.condition.text}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300 text-left">
                <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-3 py-2">Odczuwalna: {weather.current.feelslike_c}°C</div>
                <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-3 py-2">Wilgotność: {weather.current.humidity}%</div>
                <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-3 py-2">Wiatr: {weather.current.wind_kph} km/h</div>
                <div className="rounded-lg bg-gray-50 dark:bg-zinc-800 px-3 py-2">Ciśnienie: {weather.current.pressure_mb} hPa</div>
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

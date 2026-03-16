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

      <main className="flex-1 flex flex-col items-center justify-center gap-10 p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-900 dark:to-black">

        <section className="w-full flex justify-center">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-full max-w-md">

            <form className="flex gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Wpisz nazwę miasta"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
              />

              <button
                type="submit"
                disabled={!city.trim() || loading}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
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

        <section className="w-full flex justify-center">

          {loading && (
            <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-xl shadow-md text-gray-700 dark:text-gray-300 animate-pulse">
              Ładowanie...
            </div>
          )}

          {!loading && weather && (
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl text-center w-full max-w-md">

              <div className="text-2xl font-bold mb-4">
                {weather.location.name}, {weather.location.country}
              </div>

              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-5xl font-bold">
                  {weather.current.temp_c}°C
                </span>

                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  className="w-16 h-16"
                />
              </div>

              <div className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                {weather.current.condition.text}
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Wilgotność: {weather.current.humidity}% | Wiatr: {weather.current.wind_kph} km/h
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <div>Odczuwalna: {weather.current.feelslike_c}°C</div>
                  <div>Wilgotność: {weather.current.humidity}%</div>
                  <div>Wiatr: {weather.current.wind_kph} km/h</div>
                  <div>Ciśnienie: {weather.current.pressure_mb} hPa</div>
                </div>
              </div>


            </div>
          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

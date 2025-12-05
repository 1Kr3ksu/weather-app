"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";


// import "./css/main.css";

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
    } catch (err: any) {
      setError("Nie znaleziono miasta lub wystąpił błąd.");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <section className="search-panel-section">
          <div className="search-panel">
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Wpisz nazwę miasta"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input"
              />
              <button type="submit" className="search-button" disabled={!city.trim() || loading}>
                {loading ? "Ładowanie..." : "Szukaj"}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
        </section>
        <section className="weather-section">
          {loading && (
            <div className="progress-bar">
              Ładowanie...
            </div>
          )}
          {!loading && weather && (
            <div className="weather-card">
              <div className="city">
                {weather.location.name}, {weather.location.country}
              </div>
              <div className="temperature-row">
                <span className="temp">{weather.current.temp_c}°C</span>
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                  className="weather-icon"
                />
              </div>
              <div className="description">
                {weather.current.condition.text}
              </div>
              <div className="details">
                Wilgotność: {weather.current.humidity}% | Wiatr: {weather.current.wind_kph} km/h
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
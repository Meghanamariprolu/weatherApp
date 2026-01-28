"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchCity) return;

    const fetchWeather = async () => {
      try {
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=e8103a682544ee6e91c3f1c8a3d9313b`
        );

        if (!res.ok) {
          throw new Error("City not found");
        }

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setWeather(null);
        setError(err.message);
      }
    };

    fetchWeather();
  }, [searchCity]); // 🔥 runs ONLY after button click

  const handleSearch = () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[380px] text-center">
        <h1 className="text-xl font-semibold mb-4">Weather App</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border border-blue-500 rounded px-3 py-2 outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Get Weather
          </button>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {weather && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">{weather.name}</h2>
            <p className="text-gray-700 capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-2xl font-semibold">
              {Math.round(weather.main.temp)}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
}





















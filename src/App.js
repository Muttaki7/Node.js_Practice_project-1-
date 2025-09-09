import React, { useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
          `http://localhost:5000/weather?city=${city}`
      );
      setWeather(response.data);
    } catch (error) {
      setError("Could not get weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Decide background gradient & icon based on weather condition
  const getTheme = (condition) => {
    if (!condition) return { bg: "from-blue-400 to-indigo-600", icon: <WiDaySunny size={60} /> };

    const desc = condition.toLowerCase();

    if (desc.includes("clear"))
      return { bg: "from-yellow-300 to-orange-500", icon: <WiDaySunny size={60} /> };
    if (desc.includes("cloud"))
      return { bg: "from-gray-400 to-gray-700", icon: <WiCloud size={60} /> };
    if (desc.includes("rain"))
      return { bg: "from-blue-500 to-blue-900", icon: <WiRain size={60} /> };
    if (desc.includes("snow"))
      return { bg: "from-gray-200 to-blue-400", icon: <WiSnow size={60} /> };
    if (desc.includes("thunder"))
      return { bg: "from-purple-500 to-gray-800", icon: <WiThunderstorm size={60} /> };
    if (desc.includes("fog") || desc.includes("mist"))
      return { bg: "from-gray-300 to-gray-500", icon: <WiFog size={60} /> };

    return { bg: "from-blue-400 to-indigo-600", icon: <WiDaySunny size={60} /> };
  };

  const condition = weather?.data?.weather?.[0]?.description || "";
  const theme = getTheme(condition);

  return (
      <div
          className={`flex items-center justify-center min-h-screen bg-gradient-to-r ${theme.bg} p-6`}
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">🌤 Weather App</h1>

          <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
          />

          <button
              onClick={fetchWeather}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Weather
          </button>

          {loading && <p className="mt-4">Loading...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          {weather && (
              <div className="mt-6">
                <div className="flex flex-col items-center gap-2">
                  {theme.icon}
                  <h2 className="text-xl font-semibold">
                    {weather.data.name}, {weather.data.sys.country}
                  </h2>
                  <p className="text-gray-700 text-lg">
                    🌡 {weather.data.main.temp} °C
                  </p>
                  <p className="capitalize">{condition}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Source: {weather.source}
                  </p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;

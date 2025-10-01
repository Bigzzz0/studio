"use server";

import type {
  WeatherApiResponse,
  AqiApiResponse,
  GeoApiResponse,
  WeatherAndAqiData,
} from "@/lib/types";

const API_KEY = "ca28730291927fff7f89bbc182f6a33d";
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const AQI_API_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

export async function getWeatherDataByCity(
  city: string
): Promise<{ data: WeatherAndAqiData | null; error: string | null }> {
  if (!city) {
    return { data: null, error: "City name cannot be empty." };
  }

  try {
    // 1. Get coordinates for the city
    const geoRes = await fetch(
      `${GEO_API_URL}?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (!geoRes.ok) {
      throw new Error(`Failed to fetch geographic data. Status: ${geoRes.status}`);
    }
    const geoData: GeoApiResponse = await geoRes.json();
    if (geoData.length === 0) {
      return {
        data: null,
        error: `Could not find city: ${city}. Please check the spelling.`,
      };
    }
    const { lat, lon } = geoData[0];

    // 2. Fetch weather and AQI data in parallel
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ),
      fetch(`${AQI_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
    ]);

    if (!weatherRes.ok) {
      throw new Error(
        `Failed to fetch weather data. Status: ${weatherRes.status}`
      );
    }
    if (!aqiRes.ok) {
      throw new Error(`Failed to fetch AQI data. Status: ${aqiRes.status}`);
    }

    const weatherData: WeatherApiResponse = await weatherRes.json();
    const aqiData: AqiApiResponse = await aqiRes.json();

    const data: WeatherAndAqiData = {
      weather: {
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        name: weatherData.name,
        country: weatherData.sys.country,
      },
      aqi: {
        aqi: aqiData.list[0].main.aqi,
        components: aqiData.list[0].components,
      },
    };

    return { data, error: null };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "An unknown error occurred." };
  }
}

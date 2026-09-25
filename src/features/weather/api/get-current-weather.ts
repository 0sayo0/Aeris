import { env } from "@/config/env";
import type { Coordinates } from "@/features/weather/schemas/geocoding.schema";
import { weatherResponseSchema } from "@/features/weather/schemas/weather.schema";
import type { Weather } from "@/features/weather/types/weather";

const CURRENT_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export async function getCurrentWeather(
  coordinates: Coordinates,
): Promise<Weather> {
  const params = new URLSearchParams({
    lat: coordinates.lat.toString(),
    lon: coordinates.lon.toString(),
    units: "metric",
    lang: "es",
    appid: env.VITE_OPENWEATHER_API_KEY,
  });

  const response = await fetch(
    `${CURRENT_WEATHER_API_URL}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();

  const weatherResponse = weatherResponseSchema.parse(data);

  const currentCondition = weatherResponse.weather[0];

  return {
    city: weatherResponse.name,
    temperature: weatherResponse.main.temp,
    feelsLike: weatherResponse.main.feels_like,
    minTemperature: weatherResponse.main.temp_min,
    maxTemperature: weatherResponse.main.temp_max,
    humidity: weatherResponse.main.humidity,
    condition: currentCondition.main,
    description: currentCondition.description,
    icon: currentCondition.icon,
  };
}

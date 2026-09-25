import { env } from "@/config/env";
import {
  geocodingResponseSchema,
  type Coordinates,
} from "@/features/weather/schemas/geocoding.schema";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";

const GEOCODING_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

export async function getCoordinates(
  search: WeatherSearch,
): Promise<Coordinates> {
  const params = new URLSearchParams({
    q: `${search.city},${search.country}`,
    limit: "1",
    appid: env.VITE_OPENWEATHER_API_KEY,
  });

  const response = await fetch(`${GEOCODING_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();

  const locations = geocodingResponseSchema.parse(data);

  const location = locations[0];

  if (!location) {
    throw new Error("Location not found");
  }

  return location;
}

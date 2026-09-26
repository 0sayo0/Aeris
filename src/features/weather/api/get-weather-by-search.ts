import { getCoordinates } from "@/features/weather/api/get-coordinates";
import { getCurrentWeather } from "@/features/weather/api/get-current-weather";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";
import type { Weather } from "@/features/weather/types/weather";

export async function getWeatherBySearch(
  search: WeatherSearch,
): Promise<Weather> {
  const coordinates = await getCoordinates(search);
  const weather = await getCurrentWeather(coordinates);

  return {
    city: search.city,
    ...weather,
  };
}

import { skipToken, useQuery } from "@tanstack/react-query";

import { getWeatherBySearch } from "@/features/weather/api/get-weather-by-search";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";

const WEATHER_STALE_TIME = 5 * 60 * 1000;

export function useWeatherQuery(search: WeatherSearch | null) {
  return useQuery({
    queryKey: ["weather", search],
    queryFn: search ? () => getWeatherBySearch(search) : skipToken,
    staleTime: WEATHER_STALE_TIME,
  });
}

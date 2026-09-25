import { useState } from "react";
import { useWeatherQuery } from "./hooks/use-weather-query";

import WeatherSearchForm from "@/features/weather/components/weather-search-form";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";

function WeatherPage() {
  const [search, setSearch] = useState<WeatherSearch | null>(null);

  const weatherQuery = useWeatherQuery(search);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <WeatherSearchForm onSubmit={setSearch} />

      {weatherQuery.isLoading && <p className="mt-6">Consultando clima...</p>}

      {weatherQuery.isError && (
        <p className="mt-6">No se pudo consultar el clima.</p>
      )}

      {weatherQuery.data && (
        <p className="mt-6">
          {weatherQuery.data.city}: {Math.round(weatherQuery.data.temperature)}{" "}
          °C
        </p>
      )}

      {search && (
        <p className="mt-6">
          {search.city} — {search.country}
        </p>
      )}
    </main>
  );
}

export default WeatherPage;

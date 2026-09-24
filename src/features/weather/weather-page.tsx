import { useState } from "react";

import WeatherSearchForm from "@/features/weather/components/weather-search-form";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";

function WeatherPage() {
  const [search, setSearch] = useState<WeatherSearch | null>(null);

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <WeatherSearchForm onSubmit={setSearch} />

      {search && (
        <p className="mt-6">
          {search.city} — {search.country}
        </p>
      )}
    </main>
  );
}

export default WeatherPage;

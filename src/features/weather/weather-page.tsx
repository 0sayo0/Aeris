import { CloudSun } from "lucide-react";
import { useState } from "react";

import weatherBackground from "@/assets/weather-background.jpg";
import WeatherCard from "@/features/weather/components/weather-card";
import WeatherError from "@/features/weather/components/weather-error";
import WeatherSearchForm from "@/features/weather/components/weather-search-form";
import WeatherSkeleton from "@/features/weather/components/weather-skeleton";
import { useWeatherQuery } from "@/features/weather/hooks/use-weather-query";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";

function WeatherPage() {
  const [search, setSearch] = useState<WeatherSearch | null>(null);

  const weatherQuery = useWeatherQuery(search);

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-slate-950">
      <img
        src={weatherBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-75"
      />

      <div className="absolute inset-0 bg-slate-950/20" />

      <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-slate-950/45" />

      <section className="relative z-10 mx-auto min-h-dvh w-full max-w-xl px-4 pt-[clamp(1.5rem,1vh,1rem)] pb-10 sm:px-6">
        <div className="w-full">
          <header className="mb-6 text-center text-white">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-3xl border border-white/30 bg-white/15 shadow-lg backdrop-blur-xl">
              <CloudSun className="size-9" />
            </div>

            <p className="text-md font-bold tracking-[0.3em] text-white uppercase text-shadow-lg">
              Aeris
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              El clima, sin ruido.
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm font-medium text-white">
              Consulta las condiciones actuales de cualquier ciudad.
            </p>
          </header>

          <WeatherSearchForm onSubmit={setSearch} />

          {search && (
            <section
              className="mt-6 h-100 sm:h-96"
              aria-live="polite"
              aria-busy={weatherQuery.isLoading}
            >
              {weatherQuery.isLoading ? (
                <WeatherSkeleton />
              ) : weatherQuery.isError ? (
                <WeatherError />
              ) : weatherQuery.data ? (
                <WeatherCard weather={weatherQuery.data} />
              ) : null}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default WeatherPage;

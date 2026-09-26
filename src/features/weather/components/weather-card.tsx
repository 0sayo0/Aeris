import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Weather } from "@/features/weather/types/weather";

type WeatherCardProps = {
  weather: Weather;
};

type WeatherMetricProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function WeatherMetric({ icon: Icon, label, value }: WeatherMetricProps) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-slate-950/4.5 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Icon className="size-4 text-slate-500" />
        <span>{label}</span>
      </div>

      <p className="mt-1.5 text-base font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 py-0 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
      <CardHeader className="shrink-0 items-center gap-1 px-6 pt-6 pb-1 text-center">
        <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-slate-400 uppercase">
          Clima actual
        </p>

        <CardTitle className="text-2xl font-semibold tracking-tight text-slate-950">
          {weather.city}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between px-5 pt-2 pb-5 sm:px-6">
        <div className="flex items-center justify-center gap-4">
          <img
            src={weather.iconUrl}
            alt={weather.description}
            width={88}
            height={88}
            className="size-22 object-contain drop-shadow-lg"
          />

          <div>
            <p className="text-6xl leading-none font-semibold tracking-[-0.065em] text-slate-950">
              {Math.round(weather.temperature)}°
            </p>

            <p className="mt-2 text-sm text-slate-500 first-letter:uppercase">
              {weather.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <WeatherMetric
            icon={Thermometer}
            label="Sensación"
            value={`${Math.round(weather.feelsLike)} °C`}
          />

          <WeatherMetric
            icon={Droplets}
            label="Humedad"
            value={`${weather.humidity}%`}
          />

          <WeatherMetric
            icon={ThermometerSnowflake}
            label="Mínima"
            value={`${Math.round(weather.minTemperature)} °C`}
          />

          <WeatherMetric
            icon={ThermometerSun}
            label="Máxima"
            value={`${Math.round(weather.maxTemperature)} °C`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;

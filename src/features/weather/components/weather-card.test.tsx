import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeatherCard from "@/features/weather/components/weather-card";
import type { Weather } from "@/features/weather/types/weather";

const weather: Weather = {
  city: "Ciudad de México",
  temperature: 21.4,
  feelsLike: 20.6,
  minTemperature: 18.7,
  maxTemperature: 25.2,
  humidity: 60,
  condition: "Rain",
  description: "lluvia ligera",
  iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
};

describe("WeatherCard", () => {
  it("renders the weather information", () => {
    render(<WeatherCard weather={weather} />);

    expect(
      screen.getByRole("heading", {
        name: "Ciudad de México",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("21°")).toBeInTheDocument();
    expect(screen.getByText("lluvia ligera")).toBeInTheDocument();

    expect(screen.getByText("21 °C")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("19 °C")).toBeInTheDocument();
    expect(screen.getByText("25 °C")).toBeInTheDocument();
  });

  it("renders the weather icon accessibly", () => {
    render(<WeatherCard weather={weather} />);

    const icon = screen.getByRole("img", {
      name: "lluvia ligera",
    });

    expect(icon).toHaveAttribute("src", weather.iconUrl);
  });
});

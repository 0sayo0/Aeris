import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import WeatherPage from "@/features/weather/weather-page";
import { useWeatherQuery } from "@/features/weather/hooks/use-weather-query";
import type { WeatherSearch } from "@/features/weather/schemas/weather-search.schema";
import type { Weather } from "@/features/weather/types/weather";

vi.mock("@/features/weather/hooks/use-weather-query", () => ({
  useWeatherQuery: vi.fn(),
}));

vi.mock("@/features/weather/components/weather-search-form", () => ({
  default: ({ onSubmit }: { onSubmit: (search: WeatherSearch) => void }) => (
    <button
      type="button"
      onClick={() =>
        onSubmit({
          city: "Madrid",
          country: "ES",
        })
      }
    >
      Submit test search
    </button>
  ),
}));

vi.mock("@/features/weather/components/weather-skeleton", () => ({
  default: () => <div>Weather skeleton</div>,
}));

vi.mock("@/features/weather/components/weather-error", () => ({
  default: () => <div>Weather error</div>,
}));

vi.mock("@/features/weather/components/weather-card", () => ({
  default: ({ weather }: { weather: Weather }) => (
    <div>Weather result: {weather.city}</div>
  ),
}));

type WeatherQueryResult = ReturnType<typeof useWeatherQuery>;

function createWeatherQueryResult(
  overrides: Partial<WeatherQueryResult> = {},
): WeatherQueryResult {
  return {
    data: undefined,
    isLoading: false,
    isError: false,
    ...overrides,
  } as WeatherQueryResult;
}

const weather: Weather = {
  city: "Madrid",
  temperature: 26.2,
  feelsLike: 25.7,
  minTemperature: 22.4,
  maxTemperature: 28.1,
  humidity: 45,
  condition: "Clear",
  description: "cielo claro",
  iconUrl: "https://openweathermap.org/img/wn/01d@2x.png",
};

describe("WeatherPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render a weather result before a search", () => {
    vi.mocked(useWeatherQuery).mockReturnValue(createWeatherQueryResult());

    render(<WeatherPage />);

    expect(useWeatherQuery).toHaveBeenCalledWith(null);

    expect(screen.queryByText("Weather skeleton")).not.toBeInTheDocument();

    expect(screen.queryByText("Weather error")).not.toBeInTheDocument();

    expect(screen.queryByText(/Weather result:/i)).not.toBeInTheDocument();
  });

  it("renders the loading state", async () => {
    const user = userEvent.setup();

    vi.mocked(useWeatherQuery).mockReturnValue(
      createWeatherQueryResult({
        isLoading: true,
      }),
    );

    render(<WeatherPage />);

    await user.click(
      screen.getByRole("button", {
        name: /submit test search/i,
      }),
    );

    expect(screen.getByText("Weather skeleton")).toBeInTheDocument();

    expect(useWeatherQuery).toHaveBeenLastCalledWith({
      city: "Madrid",
      country: "ES",
    });
  });

  it("renders the error state", async () => {
    const user = userEvent.setup();

    vi.mocked(useWeatherQuery).mockReturnValue(
      createWeatherQueryResult({
        isError: true,
      }),
    );

    render(<WeatherPage />);

    await user.click(
      screen.getByRole("button", {
        name: /submit test search/i,
      }),
    );

    expect(screen.getByText("Weather error")).toBeInTheDocument();
  });

  it("renders the success state", async () => {
    const user = userEvent.setup();

    vi.mocked(useWeatherQuery).mockReturnValue(
      createWeatherQueryResult({
        data: weather,
      }),
    );

    render(<WeatherPage />);

    await user.click(
      screen.getByRole("button", {
        name: /submit test search/i,
      }),
    );

    expect(screen.getByText("Weather result: Madrid")).toBeInTheDocument();
  });
});

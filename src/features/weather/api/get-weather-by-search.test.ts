import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getWeatherBySearch } from "@/features/weather/api/get-weather-by-search";

vi.mock("@/config/env", () => ({
  env: {
    VITE_OPENWEATHER_API_KEY: "test-api-key",
  },
}));

const geocodingResponse = [
  {
    name: "Ciudad de México",
    lat: 19.4326,
    lon: -99.1332,
    country: "MX",
  },
];

const weatherResponse = {
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "lluvia ligera",
      icon: "10d",
    },
  ],
  main: {
    temp: 21.4,
    feels_like: 20.6,
    temp_min: 18.7,
    temp_max: 25.2,
    humidity: 60,
  },
};

describe("getWeatherBySearch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("gets coordinates and returns the transformed weather", async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify(geocodingResponse), {
          status: 200,
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(weatherResponse), {
          status: 200,
        }),
      );

    const result = await getWeatherBySearch({
      city: "Ciudad de México",
      country: "MX",
    });

    expect(result).toEqual({
      city: "Ciudad de México",
      temperature: 21.4,
      feelsLike: 20.6,
      minTemperature: 18.7,
      maxTemperature: 25.2,
      humidity: 60,
      condition: "Rain",
      description: "lluvia ligera",
      iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const firstRequest = fetchMock.mock.calls[0]?.[0];
    const secondRequest = fetchMock.mock.calls[1]?.[0];

    if (typeof firstRequest !== "string" || typeof secondRequest !== "string") {
      throw new Error("Expected fetch to be called with string URLs");
    }

    const geocodingUrl = new URL(firstRequest);
    const weatherUrl = new URL(secondRequest);

    expect(geocodingUrl.origin).toBe("https://api.openweathermap.org");

    expect(geocodingUrl.pathname).toBe("/geo/1.0/direct");

    expect(geocodingUrl.searchParams.get("q")).toBe("Ciudad de México,MX");

    expect(geocodingUrl.searchParams.get("limit")).toBe("1");

    expect(weatherUrl.origin).toBe("https://api.openweathermap.org");

    expect(weatherUrl.pathname).toBe("/data/2.5/weather");

    expect(weatherUrl.searchParams.get("lat")).toBe("19.4326");
    expect(weatherUrl.searchParams.get("lon")).toBe("-99.1332");
    expect(weatherUrl.searchParams.get("units")).toBe("metric");
    expect(weatherUrl.searchParams.get("lang")).toBe("es");
  });

  it("throws when the location cannot be found", async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
      }),
    );

    await expect(
      getWeatherBySearch({
        city: "CiudadQueNoExiste",
        country: "MX",
      }),
    ).rejects.toThrow("Location not found");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws when the geocoding request fails", async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValueOnce(
      new Response(null, {
        status: 401,
      }),
    );

    await expect(
      getWeatherBySearch({
        city: "Madrid",
        country: "ES",
      }),
    ).rejects.toThrow("Geocoding request failed with status 401");
  });
});

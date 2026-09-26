import { describe, expect, it } from "vitest";

import { weatherSearchSchema } from "@/features/weather/schemas/weather-search.schema";

describe("weatherSearchSchema", () => {
  it("accepts a valid weather search", () => {
    const result = weatherSearchSchema.parse({
      city: "Madrid",
      country: "ES",
    });

    expect(result).toEqual({
      city: "Madrid",
      country: "ES",
    });
  });

  it("trims the city value", () => {
    const result = weatherSearchSchema.parse({
      city: "   Ciudad de México   ",
      country: "MX",
    });

    expect(result.city).toBe("Ciudad de México");
  });

  it("rejects an empty city", () => {
    const result = weatherSearchSchema.safeParse({
      city: "   ",
      country: "MX",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty country", () => {
    const result = weatherSearchSchema.safeParse({
      city: "Bogotá",
      country: "",
    });

    expect(result.success).toBe(false);
  });
});

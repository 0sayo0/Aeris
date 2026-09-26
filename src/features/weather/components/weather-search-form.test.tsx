import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import WeatherSearchForm from "@/features/weather/components/weather-search-form";

describe("WeatherSearchForm", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<WeatherSearchForm onSubmit={onSubmit} />);

    await user.click(
      screen.getByRole("button", {
        name: /consultar clima/i,
      }),
    );

    expect(
      await screen.findByText("Ingresa una ciudad", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Selecciona un país", {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a valid weather search", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<WeatherSearchForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: /ciudad/i }),
      "Ciudad de México",
    );

    await user.click(screen.getByRole("combobox", { name: /país/i }));

    await user.click(await screen.findByRole("option", { name: "México" }));

    await user.click(
      screen.getByRole("button", {
        name: /consultar clima/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      city: "Ciudad de México",
      country: "MX",
    });
  });

  it("submits the trimmed city value", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<WeatherSearchForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: /ciudad/i }),
      "   Madrid   ",
    );

    await user.click(screen.getByRole("combobox", { name: /país/i }));

    await user.click(await screen.findByRole("option", { name: "España" }));

    await user.click(
      screen.getByRole("button", {
        name: /consultar clima/i,
      }),
    );

    expect(onSubmit.mock.calls[0]?.[0]).toEqual({
      city: "Madrid",
      country: "ES",
    });
  });
});

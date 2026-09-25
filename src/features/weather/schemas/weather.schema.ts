import { z } from "zod";

export const weatherResponseSchema = z.object({
  name: z.string(),

  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
  }),

  weather: z
    .array(
      z.object({
        id: z.number(),
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    )
    .min(1),
});

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;

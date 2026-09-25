import { z } from "zod";

const envSchema = z.object({
  VITE_OPENWEATHER_API_KEY: z
    .string()
    .min(1, "VITE_OPENWEATHER_API_KEY is required"),
});

export const env = envSchema.parse(
  import.meta.env,
); /* Validate import.meta.env using envSchema
and if it's okay, return the validated data.v */

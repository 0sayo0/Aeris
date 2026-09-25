import { z } from "zod";

const envSchema = z.object({
  VITE_OPENWEATHER_API_KEY: z
    .string()
    .min(1, "VITE_OPENWEATHER_API_KEY is required"),
});

export const env = envSchema.parse(import.meta.env);

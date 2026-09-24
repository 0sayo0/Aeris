import { z } from "zod";

export const weatherSearchSchema = z.object({
  city: z.string().trim().min(1, "Ingresa una ciudad"),
  country: z.string().trim().min(1, "Selecciona un país"),
});

export type WeatherSearch = z.infer<typeof weatherSearchSchema>;

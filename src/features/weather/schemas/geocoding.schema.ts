import { z } from "zod";

export const coordinatesSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const geocodingResponseSchema = z.array(coordinatesSchema);

export type Coordinates = z.infer<typeof coordinatesSchema>;

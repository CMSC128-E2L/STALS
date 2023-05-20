import { z } from "zod";

export const accommodationGetManyExperiementSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  landlord: z.string().optional(),
  barangay: z.string().optional(),
  num_of_rooms: z.number().optional(),
  page: z.number().optional(),
  multiplier: z.number().optional(),
  typeArray: z.array(z.string()).optional(),
  tagArray: z.string().array().optional(),
});

import { z } from "zod";

export const accommodationGetManyExperiementSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  landlord: z.string().optional(),
  barangay: z.string().optional(),
  num_of_rooms: z.number().optional(),
  typeArray: z.array(z.string()).optional(),
  tagArray: z.string().array().optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export const userEditSchema = z.object({
  first_name: z.string().min(1).optional(),
  middle_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  suffix: z.string().optional(),
  username: z.string().min(8).optional(),
  contact_number: z.string().min(10).optional(),
});

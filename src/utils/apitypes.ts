import { AccommodationType, UserType } from "@prisma/client";
import { z } from "zod";

/* ACCOMMODATION */

export const accommodationGetManyExperiementSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  landlord: z.string().optional(),
  barangay: z.string().optional(),
  num_of_rooms: z.number().optional(),
  typeArray: z.array(z.string()).optional(),
  tagArray: z.string().array().optional(),
  price_min: z.number().optional(),
  price_max: z.number().optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
});

export const accommodationAddSchema = z.object({
  name: z.string(),
  address: z.string(),
  location: z.string(),
  contact_number: z.string(),
  tags: z.string(),
  num_of_rooms: z.number(),
  is_archived: z.boolean(),
  fb_page: z.string().optional(),
  type: z.nativeEnum(AccommodationType),
});

export const accommodationEditSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  contact_number: z.string().optional(),
  fb_page: z.string().optional(),
});

/* USER */

export const userEditSchema = z.object({
  first_name: z.string().min(1).optional(),
  middle_name: z.string().optional(),
  last_name: z.string().min(1).optional(),
  Suffix: z.string().optional(),
  username: z
    .string()
    .min(8, { message: "Must be at least 8 characters" })
    .optional(),
  contact_number: z
    .string()
    .min(10, { message: "Must be at least length of 10" })
    .optional(),
  type: z.nativeEnum(UserType),
});

/* REVIEW */

export const reviewAddSchema = z.object({
  accommodationId: z.string(),
  review: z.string().optional(),
  rating: z.number(),
});

export const reviewEditSchema = z.object({
  id: z.string(),
  review: z.string().optional(),
  rating: z.number().optional(),
});

export const reviewGetManySchema = z.object({
  accommodationId: z.string(),
  page: z.number(),
  multiplier: z.number(),
});

/* ROOM */
export const roomAddSchema = z.object({
  accommodationId: z.string().min(3),
  price: z.number(),
  num_of_beds: z.number(),
  occupied: z.boolean(),
  with_aircon: z.boolean(),
  with_utilities: z.boolean(),
});

export const roomEditSchema = z.object({
  id: z.string(),
  price: z.number(),
  num_of_beds: z.number(),
  occupied: z.boolean(),
  with_aircon: z.boolean(),
  with_utilities: z.boolean(),
});

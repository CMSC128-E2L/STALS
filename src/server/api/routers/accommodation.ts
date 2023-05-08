import { AccommodationType } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const accommodationRouter = createTRPCRouter({
  // Get all accommodation homepage
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.accommodation.findMany({
        select: {
          name: true,
          location: true,
        },
        orderBy: {
          location: "asc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  // Get one accommodation
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.accommodation.findUnique({
      where: { id },
    });
  }),

  // Add a new accommodation
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        location: z.string(),
        contact_number: z.string(),
        tags: z.string(),
        num_of_rooms: z.number(),
        is_archived: z.boolean(),
        fb_page: z.string().optional(),
        type: z.nativeEnum(AccommodationType),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {
        name,
        address,
        location,
        contact_number,
        tags,
        num_of_rooms,
        is_archived,
        fb_page,
        type,
      } = input;
      return ctx.prisma.accommodation.create({
        data: {
          name,
          address,
          location,
          landlord: userId,
          contact_number,
          tags,
          num_of_rooms,
          is_archived,
          fb_page,
          type,
        },
      });
    }),

  // Archive accommodation
  archive: protectedProcedure
    .input(z.object({ id: z.string(), is_archived: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const id = input.id;
      const archived = input.is_archived;
      return ctx.prisma.accommodation.update({
        where: { id },
        data: {
          is_archived: !archived,
        },
      });
    }),

  // Get All Archived accommodations
  getArchives: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.accommodation.findMany({
        where: {
          is_archived: true,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  // Delete an accommodation
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.accommodation.delete({
      where: { id },
    });
  }),

  // Search an accommodation
  getMany: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        location: z.string().optional(),
        landlord: z.string().optional(),
        tags: z.string().optional(),
        num_of_rooms: z.number().optional(),
        page: z.number().optional(),
        multiplier: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.accommodation.findMany({
        skip: input.page,
        take: input.multiplier,
        where: {
          OR: [
            {
              name: {
                contains: input.name,
              },
              address: {
                contains: input.address,
              },
              location: {
                contains: input.location,
              },
              landlord: {
                contains: input.landlord,
              },
              tags: input.tags,
              num_of_rooms: input.num_of_rooms,
            },
          ],
        },
      });
    }),

  // Edit an accommodation
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        address: z.string().optional(),
        location: z.string().optional(),
        landlord: z.string().optional(),
        contact_number: z.string().optional(),
        tags: z.string().optional(),
        num_of_rooms: z.number().optional(),
        is_archived: z.boolean().optional(),
        fb_page: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.accommodation.update({
        where: { id },
        data: {
          name: input.name,
          address: input.address,
          location: input.location,
          contact_number: input.contact_number,
          tags: input.tags,
          num_of_rooms: input.num_of_rooms,
          is_archived: input.is_archived,
          fb_page: input.fb_page,
        },
      });
    }),
});

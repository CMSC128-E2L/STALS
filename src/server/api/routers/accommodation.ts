import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  accommodationAddSchema,
  accommodationGetManyExperiementSchema,
} from "~/utils/apitypes";

export const accommodationRouter = createTRPCRouter({
  // TODO: Remove.  Example implementaion only
  getInfiniteExample: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async (opts) => {
      const { input, ctx } = opts;
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.accommodation.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          name: true,
          location: true,
        },
        orderBy: {
          location: "asc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  getBarangays: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.accommodation.findMany({
        distinct: ["barangay"],
        select: {
          barangay: true,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  // getAvgRatings: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   const id = input;
  //   return ctx.prisma.accommodation.findUnique({
  //     where: { id },
  //     select: {
  //       average_rating: true
  //     }
  //   });
  // }),

  getAvgRatings: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      //const id = input;
      return ctx.prisma.accommodation.findUnique({
        where: { id: input.id },
        select: {
          average_rating: true,
          total_reviews: true,
        },
      });
    }),

  // Get one accommodation
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.accommodation.findUnique({
      where: { id },
    });
  }),

  // Get one accommodation with rooms and reviews
  getOneRelations: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.accommodation.findUnique({
      include: {
        Room: { orderBy: { occupied: "asc" } },
        Review: true,
        landlordUser: true,
      },
      where: { id },
    });
  }),

  // Add a new accommodation
  add: protectedProcedure
    .input(accommodationAddSchema)
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.prisma.accommodation.create({
        data: {
          ...input,
          num_of_rooms: 0,
          average_rating: 0,
          total_reviews: 0,
          landlordUser: { connect: { id: userId } },
          tagArray: { values: input.tagArray },
          typeArray: { values: input.typeArray },
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
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
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
        barangay: z.string().optional(),
        tags: z.string().optional(),
        num_of_rooms: z.number().optional(),
        page: z.number().optional(),
        multiplier: z.number().optional(),
        is_archived: z.boolean().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.accommodation.findMany({
        skip: input.page,
        take: input.multiplier,
        where: {
          ...(input.is_archived !== undefined
            ? { is_archived: input.is_archived }
            : {}),
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
              barangay: {
                contains: input.barangay,
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
  // Search an accommodation
  getManyExperiment: publicProcedure
    .input(accommodationGetManyExperiementSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.accommodation.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(input.is_archived !== undefined
            ? { is_archived: input.is_archived }
            : {}),
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
              barangay: {
                contains: input.barangay,
              },
              landlord: {
                contains: input.landlord,
              },
              num_of_rooms: input.num_of_rooms,
              tagArray: {
                path: "$.values",
                array_contains: input.tagArray ?? [],
              },
              typeArray: {
                path: "$.values",
                array_contains: input.typeArray ?? [],
              },
              price: {
                ...(input.price_min !== undefined
                  ? { gte: input.price_min }
                  : {}),
                ...(input.price_max !== undefined
                  ? { lte: input.price_max }
                  : {}),
              },
            },
          ],
        },
        orderBy: {
          ...(input.sortByName == true ? { name: "asc" } : {}),
          ...(input.sortByRating == true ? { average_rating: "desc" } : {}),
          ...(input.sortByPrice == true ? { price: "asc" } : {}),
          // // Add the properties you want to order by and their sorting direction
          // name: 'asc', // Example: Sort by name in ascending order
          // // Add more properties as needed
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
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

  // Compute  an accommodation
  average: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        average_rating: z.number().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.accommodation.update({
        where: { id },
        data: {
          average_rating: input.average_rating,
        },
      });
    }),
});

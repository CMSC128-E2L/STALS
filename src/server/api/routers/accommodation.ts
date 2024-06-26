import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  accommodationAddSchema,
  accommodationEditSchema,
  accommodationGetManyExperiementSchema,
} from "~/utils/apitypes";

export const accommodationRouter = createTRPCRouter({
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

  getAvgRatings: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
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
        // Room: { orderBy: { occupied: "asc" } },
        Room: true,
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
      const { price, tagArray, typeArray, ...restInput } = input;
      return ctx.prisma.accommodation.create({
        data: {
          ...restInput,
          price: parseFloat(price),
          num_of_rooms: 0,
          average_rating: 0,
          total_reviews: 0,
          is_archived: false,
          landlordUser: { connect: { id: userId } },
          tagArray: { values: tagArray },
          typeArray: { values: typeArray },
          tags: "",
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

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.accommodation.findMany({
      include: {
        Room: { orderBy: { occupied: "asc" } },
        landlordUser: true,
      },
    });
  }),

  // Search an accommodation
  getMany: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        location: z.string().optional(),
        landlord: z.string().optional(),
        barangay: z.string().optional(),
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
        include: { landlordUser: true, Room: { orderBy: { occupied: "asc" } } },
        where: {
          ...(input.is_archived !== undefined
            ? { is_archived: input.is_archived }
            : {}),
          OR: [
            {
              name: {
                contains: input.name,
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
              // tags: input.tags,
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
        include: { landlordUser: true, Room: { orderBy: { occupied: "asc" } } },
        where: {
          ...(input.showAll == undefined
            ? { is_archived: false }
            : input.showAll
            ? {}
            : { is_archived: false }),
          OR: [
            {
              name: {
                contains: input.name,
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
                path: ["values"],
                array_contains: input.tagArray ?? [],
              },
              typeArray: {
                path: ["values"],
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
        orderBy: [
          input.sortByName !== null
            ? { name: input.sortByName ? "asc" : "desc" }
            : {},
          input.sortByRating !== null
            ? { average_rating: input.sortByRating ? "asc" : "desc" }
            : {},
          input.sortByPrice !== null
            ? { price: input.sortByPrice ? "asc" : "desc" }
            : {},
        ],
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
    .input(accommodationEditSchema)
    .mutation(({ ctx, input }) => {
      const id = input.id;
      const price = parseFloat(input.price);
      return ctx.prisma.accommodation.update({
        where: { id },
        data: {
          name: input.name,
          location: input.location,
          contact_number: input.contact_number,
          price: price,
          // num_of_rooms: input.num_of_rooms,
          // is_archived: input.is_archived,
          contract_length: input.contract_length,
          fb_page: input.fb_page,
          typeArray: { values: input.typeArray },
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
  updateAllReviews: protectedProcedure.mutation(async ({ ctx }) => {
    const accoms = await ctx.prisma.accommodation.findMany();
    accoms.map(async (accomData) => {
      const allreview = await ctx.prisma.review.aggregate({
        where: {
          accommodationId: accomData.id,
          is_archived: false,
        },
        _avg: {
          rating: true,
        },
        _count: {
          rating: true,
        },
      });

      await ctx.prisma.accommodation.update({
        where: {
          id: accomData.id,
        },
        data: {
          average_rating: allreview._avg.rating,
          total_reviews: allreview._count.rating,
        },
      });
    });
  }),
});

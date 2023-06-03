import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import {
  reviewAddSchema,
  reviewEditSchema,
  reviewGetManySchema,
  reviewGetInfSchema,
} from "~/utils/apitypes";

export const reviewRouter = createTRPCRouter({
  add: protectedProcedure
    .input(reviewAddSchema)
    .mutation(async ({ ctx, input }) => {
      // Date
      const now = new Date();
      const timeOnly = now.toLocaleString("en-US", {
        timeZone: "Asia/Hong_Kong",
        minute: "numeric",
        hour: "numeric",
        hour12: true,
      });
      const dateOnly = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Hong_Kong",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      console.log(timeOnly);
      console.log(dateOnly);

      const userId = ctx?.session?.user?.id;
      const { accommodationId, review, rating } = input;

      const date = dateOnly;
      const time = timeOnly;

      const created = ctx.prisma.review.create({
        data: {
          user: { connect: { id: userId } },
          accommodation: { connect: { id: accommodationId } },
          review,
          rating,
          time,
          date,
        },
      });

      const oldvalues = await ctx.prisma.accommodation.findUnique({
        select: {
          average_rating: true,
          total_reviews: true,
        },
        where: {
          id: input.accommodationId,
        },
      });

      let avg = oldvalues?.average_rating ?? 0;
      let count = oldvalues?.total_reviews ?? 0;

      count += 1;
      avg = avg + (input.rating - avg) / count;

      await ctx.prisma.accommodation.update({
        where: {
          id: input.accommodationId,
        },
        data: {
          average_rating: avg,
          total_reviews: count,
        },
      });

      return created;
    }),

  edit: protectedProcedure
    .input(reviewEditSchema)
    .mutation(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.review.update({
        where: { id },
        data: {
          review: input.review,
          rating: input.rating,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.review.delete({
        where: { id },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      const id = input;
      return ctx.prisma.review.deleteMany({
        where: { accommodationId: id },
      });
    }),

  // archive: protectedProcedure
  //   .input(z.object({ id: z.string(), is_archived: z.boolean() }))
  //   .mutation(({ ctx, input }) => {
  //     const id = input.id;
  //     const archived = input.is_archived;
  //     return ctx.prisma.review.update({
  //       where: { id },
  //       data: {
  //         is_archived: true,
  //       },
  //     });
  //   }),

  // getArchives: publicProcedure.query(async ({ ctx }) => {
  //   try {
  //     return await ctx.prisma.review.findMany({
  //       where: {
  //         is_archived: true,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }),

  getMany: publicProcedure
    .input(reviewGetManySchema)
    .query(({ ctx, input }) => {
      const { accommodationId, page, multiplier } = input;
      return ctx.prisma.review.findMany({
        skip: page,
        take: multiplier,
        include: {
          user: true,
        },

        orderBy: {
          rating: "desc",
        },
        where: { accommodationId: accommodationId },
      });
    }),

  // Get one review
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.review.findUnique({
      where: { id },
    });
  }),

  getTopReview: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const accommodationId = input;
    return ctx.prisma.review.findFirst({
      include: {
        user: true,
      },
      where: {
        accommodationId: accommodationId,
      },
      orderBy: {
        rating: "desc",
      },
    });
  }),

  getInfinite: publicProcedure.input(reviewGetInfSchema).query(async (opts) => {
    const { input, ctx } = opts;
    const limit = input.limit ?? 50;
    const { cursor } = input;
    const items = await ctx.prisma.review.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        user: true,
      },
      where: {
        accommodationId: input.accommodationId,
      },
      orderBy: {
        rating: "desc",
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
});

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
} from "~/utils/apitypes";

export const reviewRouter = createTRPCRouter({
  add: protectedProcedure
    .input(reviewAddSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user?.id;
      const { accommodationId, review, rating } = input;

      const created = ctx.prisma.review.create({
        data: {
          user: { connect: { id: userId } },
          accommodation: { connect: { id: accommodationId } },
          review,
          rating,
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

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    const id = input;
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
        where: { accommodationId: accommodationId },
      });
    }),
});

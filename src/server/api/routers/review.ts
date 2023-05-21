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
  add: protectedProcedure.input(reviewAddSchema).mutation(({ ctx, input }) => {
    const userId = ctx?.session?.user?.id;
    const { accommodationId, review, rating } = input;

    return ctx.prisma.review.create({
      data: {
        user: { connect: { id: userId } },
        accommodation: { connect: { id: accommodationId } },
        review,
        rating,
      },
    });
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

  // archive: protectedProcedure
  //   .input(z.object({ id: z.string(), is_archived: z.boolean() }))
  //   .mutation(({ ctx, input }) => {
  //     const id = input.id;
  //     const archived = input.is_archived;
  //     return ctx.prisma.review.update({
  //       where: { id },
  //       data: {
  //         is_archived: !archived,
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

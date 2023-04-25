import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        accommodationId: z.string(),
        review: z.string().optional(),
        rating: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
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

  getMany: publicProcedure
    .input(
      z.object({
        accommodationId: z.string(),
        page: z.number(),
        multiplier: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const { accommodationId, page, multiplier } = input;
      return ctx.prisma.review.findMany({
        skip: page,
        take: multiplier,
        where: { accommodationId: accommodationId },
      });
    }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({

    addReview: protectedProcedure
        .input(
            z.object({
            accommodationId: z.string(),
            review: z.string(),
            rating: z.number(),
            })
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

    getMany: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        const accommodationId = input;
            return ctx.prisma.review.findMany({
                where: { accommodationId },
            });
        }),

    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.example.findMany();
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});

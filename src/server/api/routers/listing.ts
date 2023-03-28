import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const listingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.listing.findMany({
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
  // 
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.listing.findUnique({
      where: { id },
    });
  }),
});
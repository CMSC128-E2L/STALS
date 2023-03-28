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
  postMessage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.listing.create({
          data: {
            name: input.name,
            location: input.location,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
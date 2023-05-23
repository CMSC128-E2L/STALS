import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { roomAddSchema } from "~/utils/apitypes";

export const roomRouter = createTRPCRouter({
  getMany: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const accommodationId = input;
    return ctx.prisma.room.findMany({
      where: { accommodationId: accommodationId },
    });
  }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.room.findFirst({
      where: { id: id },
    });
  }),

  // Archive Room
  archive: protectedProcedure
    .input(z.object({ id: z.string(), is_archived: z.boolean() }))
    .mutation(({ ctx, input }) => {
      const id = input.id;
      const archived = input.is_archived;
      return ctx.prisma.room.update({
        where: { id },
        data: {
          is_archived: !archived,
        },
      });
    }),

  // Get All Archived Rooms
  archives: protectedProcedure
    .input(
      z.object({
        accommodationId: z.string(),
        page: z.number(),
        multiplier: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const { accommodationId, page, multiplier } = input;
      return ctx.prisma.room.findMany({
        skip: page,
        take: multiplier,
        where: {
          accommodationId: accommodationId,
          is_archived: true,
        },
      });
    }),

  // Add Room
  add: protectedProcedure //need to connect to userid?
    .input(roomAddSchema)
    .mutation(({ ctx, input }) => {
      const {
        accommodationId,
        occupied,
        num_of_beds,
        with_aircon,
        price,
        with_utilities,
      } = input;

      return ctx.prisma.room.create({
        data: {
          accommodation: { connect: { id: accommodationId } },
          occupied: occupied,
          num_of_beds: num_of_beds,
          with_aircon: with_aircon,
          price: price,
          with_utilities: with_utilities,
          is_archived: false,
        },
      });
    }),

  // Delete Room

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    //delete lodging
    const id = input;
    return ctx.prisma.room.delete({
      where: { id },
    });
  }),

  // Edit Room
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        occupied: z.boolean().optional(),
        num_of_beds: z.number().optional(),
        with_aircon: z.boolean().optional(),
        price: z.number().optional(),
        with_utilities: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const id = input.id;
      return ctx.prisma.room.update({
        where: { id },
        data: {
          occupied: input.occupied,
          num_of_beds: input.num_of_beds,
          with_aircon: input.with_aircon,
          price: input.price,
          with_utilities: input.with_utilities,
        },
      });
    }),
});

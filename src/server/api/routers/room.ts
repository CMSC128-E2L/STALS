import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { roomAddSchema, roomEditSchema } from "~/utils/apitypes";

export const roomRouter = createTRPCRouter({
  getMany: publicProcedure
    .input(z.object({ id: z.string(), status: z.boolean().optional() }))
    .query(({ ctx, input }) => {
      const accommodationId = input.id;
      const status = input.status;
      return ctx.prisma.room.findMany({
        where: { accommodationId: accommodationId, is_archived: status },
      });
    }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.room.findFirst({
      include: {
        accommodation: true,
      },
      where: { id: id },
    });
  }),

  // Archive Room
  archive: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.room.update({
      where: { id: id },
      data: {
        is_archived: true,
      },
    });
  }),

  // UnArchive Room
  unarchive: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.room.update({
      where: { id: id },
      data: {
        is_archived: false,
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
          num_of_beds: parseInt(num_of_beds),
          with_aircon: with_aircon,
          price: parseFloat(price),
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

  deleteMany: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      const id = input;
      return ctx.prisma.review.deleteMany({
        where: { accommodationId: id },
      });
    }),

  // Edit Room
  edit: protectedProcedure.input(roomEditSchema).mutation(({ ctx, input }) => {
    const id = input.id;
    const price = parseFloat(input.price);
    const num_of_beds = parseInt(input.num_of_beds);
    return ctx.prisma.room.update({
      where: { id },
      data: {
        occupied: input.occupied,
        num_of_beds,
        with_aircon: input.with_aircon,
        price,
        with_utilities: input.with_utilities,
      },
    });
  }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  // getRooms: protectedProcedure.query(({ ctx }) => {   //pwede gamitin sa search
  //   const userId = ctx.session.user.id;
  //   return ctx.prisma.room.findMany({
  //     where: { cart: { userId } },
  //     select: {
  //       occupied: true,
  //       num_of_beds: true,
  //       price: true,
  //       accommodation: true,
  //       is_archived: true,
  //     },
  //   });
  // }),

  addRoom: protectedProcedure             //need to connect to lodging id
    .input(
      z.object({
        accommodationId: z.string(),
        occupied: z.boolean(),
        num_of_beds: z.number(),
        with_aircon: z.boolean(),
        price: z.number(),
        with_utilities: z.boolean(),
        is_archived: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      const { accommodationId, occupied, num_of_beds, with_aircon, price, with_utilities, is_archived } = input;

      return ctx.prisma.room.create({
        data: {
          accommodation: { connect: { id: accommodationId }},
          occupied,
          num_of_beds,
          with_aircon,
          price,
          with_utilities,
          is_archived
        },
      });
    }),


  //delete
  deleteRoom: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {            //delete lodging
    const id = input;
    return ctx.prisma.room.delete({
      where: { id },
    });
  }),


  //edit
  increaseQuantity: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        accommodationId: z.string(),
        occupied: z.boolean(),
        num_of_beds: z.number(),
        with_aircon: z.boolean(),
        price: z.number(),
        with_utilities: z.boolean(),
        is_archived: z.boolean()
      })
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
          is_archived: input.is_archived
        },
      });
    }),
});

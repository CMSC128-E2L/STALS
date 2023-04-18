import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
    getRooms: protectedProcedure.query(({ ctx }) => {   //pwede gamitin sa search
      const userId = ctx.session.user.id;
      return ctx.prisma.Room.findMany({
        where: { cart: { userId } },
        select: {
          occupied: true,
          num_of_beds: true,
          price: true,
          accommodation: true,
          is_archived: true,
        },
      });
    }),

  addRoom: protectedProcedure             //need to connect to lodging id
  .input(
      z.object({item: z.object({ id: z.string()}), occupied: z.boolean(), num_of_beds: z.number(), with_aircon: z.boolean(), price: z.number(), with_utilities: z.boolean(), accommodation: z.string(), is_archived: z.boolean()})

          
  )

  .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {occupied, num_of_beds, price, accommodation, is_archived } = input;

      return ctx.prisma.Room.create({        //need to create id
        data: {
          occupied,
          num_of_beds,
          price,
          accommodation,
          is_archived,

        },
      });
    }),


  //delete
  deleteRoom: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {            //delete lodging
      const id = input;
      return ctx.prisma.Room.delete({
        where: { id },
      });
    }),


  //edit
  increaseQuantity: protectedProcedure                        
  .input(
    z.object({
      item: z.object({ id: z.string()}), occupied: z.boolean(), num_of_beds: z.number(), with_aircon: z.boolean(), price: z.number(), with_utilities: z.boolean(), accommodation: z.string(), is_archived: z.boolean()})
  )
  .mutation(({ ctx, input }) => {
    const { item } = input;
    const { id } = item;
    return ctx.prisma.Room.update({
      where: { id },
      data: {
          occupied: input.occupied,
          num_of_beds: input.num_of_beds,
          price: input.price,
          accommodation: input.accommodation,
          is_archived: input.is_archived,
      },
    });
  }),
});

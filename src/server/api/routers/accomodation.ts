import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
/*
 (1) Check lodging list in add Accomodation
*/
export const accommodationRouter = createTRPCRouter({
  // Get all accomodation
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.accomodation.findMany({
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

  // Get one accomodation
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.accomodation.findUnique({
      where: { id },
    });
  }),


  // Add a new accomodation
  addAccomodation: protectedProcedure
  .input(
      z.object({ name: z.string(), address: z.string(), facebook: z.string(), email: z.string(), contactNum: z.number(), 
          category: z.string(), rates: z.number(), roomQuantity: z.number() })
  )
  .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // remove unit quantity as last parameter in input
      const {name, address, facebook, email, contactNum, category, rates} = input;
      return ctx.prisma.lodgingList.create({        //need to create id
      data: {
          name,
          address,
          facebook,
          email,
          contactNum,
          category,
          rates,
          //unitQuantity,
      },
      });
  }),

  // Archive an accomodation
  archiveAccomodation: protectedProcedure
  .input(z.object({id: z.string(), isArchived: z.boolean()}))
  .mutation(({ctx, input}) => {
      const userId = ctx.session.user.id;
      const id = input.id;
      const archived = input.isArchived;
      return ctx.prisma.accomodation.update({
          where: {userId, id},
          data: {
              isArchived: !archived,
          }
      })
  }),
  
  // Get All Archived Accomodations
  getArchivedAccomodations: protectedProcedure.input(z.string()).query(({ctx}) => {
  const userId = ctx.session.user.id;
  return ctx.prisma.accomodation.findAll({
      where: {userId},
      include: {
          isArchived: true,
      }
  })
  }),

  // Delete an accomodation
  deleteAccomodation: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
      const id = input;
      return ctx.prisma.accomodation.delete({
        where: { id },
      });
  }),

  // Search an accomodation
  searchAccomodation: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      const name = input;
      return ctx.prisma.accomodation.findMany({
        where: { name:{
          contains: name
        } },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // Edit an accomodation 
  editAccomodation: protectedProcedure
  .input(
    z.object({
      item: z.object({ id: z.string(), name: z.string(), contact_number: z.number() }),
      name: z.string(),
    })
  )
  .mutation(({ ctx, input }) => {
    const { item } = input;
    const { id } = item;
    return ctx.prisma.cartItem.update({
      where: { id },
      data: {
        name: item.name
      },
    });
  }),

});
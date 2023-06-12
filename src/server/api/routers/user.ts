import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { userEditSchema } from "~/utils/apitypes";

export const userRouter = createTRPCRouter({
  edit: protectedProcedure.input(userEditSchema).mutation(({ ctx, input }) => {
    const id = ctx.session.user.id;
    return ctx.prisma.user.update({
      where: { id },
      data: { ...input },
    });
  }),

  delete: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx?.session?.user?.id;
    return ctx.prisma.user.delete({
      where: { id: userId },
    });
  }),

  getInfo: publicProcedure.query(({ ctx }) => {
    const userId = ctx?.session?.user.id;
    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        first_name: true,
        middle_name: true,
        last_name: true,
        contact_number: true,
        email: true,
      },
    });
  }),

  getType: publicProcedure.query(({ ctx }) => {
    const userId = ctx?.session?.user.id;
    return ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        type: true,
      },
    });
  }),

  // Get one user
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.user.findUnique({
      where: { id },
    });
  }),

  setVerify: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx?.session?.user.id;
    return ctx.prisma.user.update({
      where: { id: userId },
      data: {
        is_visible: true,
      },
    });
  }),

  addFavorite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id;
      const accommodationId = input;
      const favorite = await ctx.prisma.favorite.create({
        data: {
          user: { connect: { id: userId } },
          accommodation: { connect: { id: accommodationId } },
        },
      });

      return favorite;
    }),

  removeFavorite: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const accommodationId = input;
      return ctx.prisma.favorite.deleteMany({
        where: {
          userId,
          accommodationId,
        },
      });
    }),

  getFavorites: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;
    return ctx.prisma.favorite.findMany({
      where: {
        userId,
      },
      select: {
        accommodation: {
          select: {
            id: true,
            name: true,
            price: true,
            barangay: true,
            tagArray: true,
            typeArray: true,
          },
        },
      },
    });
  }),
});

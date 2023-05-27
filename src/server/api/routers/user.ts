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

  // Get one user
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = input;
    return ctx.prisma.user.findUnique({
      where: { id },
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
        username: true,
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

  setVerify: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx?.session?.user.id;
    return ctx.prisma.user.update({
      where: { id: userId },
      data: {
        is_visible: true,
      },
    });
  }),
});

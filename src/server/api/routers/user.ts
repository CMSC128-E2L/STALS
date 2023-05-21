import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  // example not final
  manualCreate: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.create({
        data: {
          username: "vcdayag@up.edu.ph",
          password: "password",
          first_name: "Van Paul Angelo",
          middle_name: "Capulong",
          last_name: "Dayag",
          contact_number: "69",
          email_address: "vcdayag@up.edu.ph",
          is_visible: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }),
  getFirst: publicProcedure.query(async () => {
    return prisma.user.findFirst();
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

  // addUser: protectedProcedure
  //   .input(
  //     z.object({
  //       subtype: z.number(),
  //       username: z.string(),
  //       password: z.string(),
  //       first_name: z.string(),
  //       middle_name: z.string(),
  //       last_name: z.string(),
  //       contact_number: z.number(),
  //       is_visible: z.boolean()
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     const userId = ctx?.session?.user?.id;
  //     return ctx.prisma.user.create({
  //       where: { id: userId },
  //       data: {
  //         subtype: input.subtype,
  //         username: input.username,
  //         password: input.password,
  //         first_name: input.first_name,
  //         middle_name: input.middle_name,
  //         last_name: input.last_name,
  //         contact_number: input.contact_number,
  //         is_visible: input.is_visible
  //       },
  //     });
  //   }),

  delete: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx?.session?.user?.id;
    return ctx.prisma.user.delete({
      where: { id: userId },
    });
  }),

  edit: protectedProcedure
    .input(
      z.object({
        //username: z.string(),
        first_name: z.string().optional(),
        middle_name: z.string().optional(),
        last_name: z.string().optional(),
        contact_number: z.string().optional(),
        username: z.string().optional(),
        suffix: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const id = ctx.session.user.id;
      const { username, first_name, middle_name, last_name, contact_number } =
        input;
      return ctx.prisma.user.update({
        where: { id },
        data: {
          username,
          first_name,
          middle_name,
          last_name,
          contact_number,
        },
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
        email_address: true,
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

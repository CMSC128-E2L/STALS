import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
  // example not final
  manualCreate: publicProcedure.query(async () => {
    try {
      return await prisma.user.create({
        data: {
          subtype: 1,
          username: "vcdayag@up.edu.ph",
          password: "password",
          first_name: "Van Paul Angelo",
          middle_name: "Capulong",
          last_name: "Dayag",
          contact_number: 69,
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
});

import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reportRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        type_reported: z.string(),
        reported_id: z.string(),
        reported_name: z.string(),
        report: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user_id = ctx?.session?.user?.id;
      const { type_reported, reported_id, report, reported_name } = input;
      try {
        const createReport = await ctx.prisma.report.create({
          data: {
            user: { connect: { id: user_id } },
            type_reported,
            reported_id,
            reported_name,
            report,
          },
        });
        return createReport;
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          if (e.code === "P2002") {
            console.log("There is a unique constraint violation");
          }
        }
        throw e;
      }
    }),

  getMany: publicProcedure
    .input(
      z.object({
        type: z.string(),
        page: z.number(),
        multiplier: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.report.findMany({
        where: {
          type_reported: input.type,
        },
        select: {
          userId: true,
          type_reported: true,
          reported_id: true,
          report: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
        skip: input.page,
        take: input.multiplier,
      });
    }),

  getAllType: publicProcedure
    .input(
      z.object({
        type: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.report.findMany({
        where: {
          type_reported: input.type,
        },
        select: {
          userId: true,
          type_reported: true,
          reported_id: true,
          reported_name: true,
          report: true,
          user: {
            select: {
              first_name: true,
              middle_name: true,
              last_name: true,
              Suffix: true,
            },
          },
        },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        page: z.number(),
        multiplier: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.report.findMany({
        select: {
          userId: true,
          type_reported: true,
          reported_id: true,
          reported_name: true,
          report: true,
          user: {
            select: {
              first_name: true,
              middle_name: true,
              last_name: true,
              Suffix: true,
            },
          },
        },
        skip: input.page,
        take: input.multiplier,
      });
    }),

  deleteReport: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        reported_id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.report.delete({
        where: {
          ReportID: {
            ...input,
          },
        },
      });
    }),
});

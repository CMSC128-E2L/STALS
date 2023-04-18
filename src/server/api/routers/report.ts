import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const reportRouter = createTRPCRouter({
  report: protectedProcedure
    .input(
        z.object({ 
            id: z.string(),
            type_reported: z.string(),
            reported_id: z.string(),
            report: z.string() 
        })
    )
    .mutation(({ ctx, input }) => {
        const user_id = ctx?.session?.user?.id;
        const { id, type_reported, reported_id, report } = input;
        return ctx.prisma.report.create({
            data: {
                id: { connect: { id: id } },
                type_reported,
                reported_id,
                user_id: { connect: { id: user_id } },
                report,
            }
        });
    }),

/* OH NAURR! not sure daw but don't delete! >__<
  
    reportUser: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {}),

    reportReview: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {}),

*/

  getManyReports: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

/* NAURR hindi rin daw sure!! UGH >__<

  getManyUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getManyReviews: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

*/

});

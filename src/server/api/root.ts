import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { accomodationRouter } from "~/server/api/routers/accomodation";
import { roomRouter } from "~/server/api/routers/room";
import { fileRouter } from "~/server/api/routers/file";
import { reviewRouter } from "~/server/api/routers/review";
import { reportRouter } from "./routers/report";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  accomodation: accomodationRouter,
  room: roomRouter,
  file: fileRouter,
  review: reviewRouter,
  report: reportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { accomodationRouter } from "~/server/api/routers/accomodation";
import { roomRouter } from "~/server/api/routers/room";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  accomodation: accomodationRouter,
  room: roomRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

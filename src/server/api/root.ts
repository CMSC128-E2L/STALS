import { createTRPCRouter } from "~/server/api/trpc";
import { developerRouter } from "~/server/api/routers/developer";
import { userRouter } from "~/server/api/routers/user";
import { accomodationRouter } from "~/server/api/routers/accomodation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  developer: developerRouter,
  user: userRouter,
  accomodation: accomodationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { env } from "~/env.mjs";

export const developerRouter = createTRPCRouter({
  getDeveloper: publicProcedure.query(() =>{
      if(env.NODE_ENV === "development"){
        return env.DEVELOPER;
      }
      return "nan";
  })
});

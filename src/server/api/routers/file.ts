import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { s3Client } from "~/utils/storage";

import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  type ObjectIdentifier,
} from "@aws-sdk/client-s3";

import { z } from "zod";

export const fileRouter = createTRPCRouter({
  deleteOne: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const response = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: "stals",
          Key: input.key,
        }),
      );
      return response;
    }),
  deleteAll: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const getobjects = await s3Client.send(
        new ListObjectsV2Command({ Bucket: "stals", Prefix: input.id }),
      );

      const objects: ObjectIdentifier[] = [];
      if (getobjects.Contents) {
        getobjects.Contents.forEach((element) => {
          objects.push({ Key: element.Key });
        });
      }

      const response = await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: "stals",
          Delete: { Objects: objects },
        }),
      );

      return response;
    }),
  getAccommImages: publicProcedure
    .input(
      z.object({
        id: z.string(),
        limit: z.number().min(1).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const output = await fetch(
        `https://stals-worker.p0lbang.workers.dev/getAll/${input.id}`,
      );
      const listimages: string[] = (await output.json()) as string[];
      return listimages;
    }),
});

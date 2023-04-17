import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { s3Client } from "~/utils/storage";
import { CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const fileRouter = createTRPCRouter({
  fileUploadExample: publicProcedure.query(async () => {
    const params = {
      Bucket: "stals-bucket-101", // The name of the bucket. For example, 'sample-bucket-101'.
      Key: "file1.txt", // The name of the object. For example, 'sample_upload.txt'.
      Body: "Hello world stals!", // The content of the object. For example, 'Hello world!".
    };

    try {
      const data = await s3Client.send(
        new CreateBucketCommand({ Bucket: params.Bucket })
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      return data;
    } catch (error) {
      return error;
    }
  }),
});

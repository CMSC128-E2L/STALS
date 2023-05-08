import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { s3Client } from "~/utils/storage";

import {
  CreateBucketCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const fileRouter = createTRPCRouter({
  r2getfiles: publicProcedure.query(async () => {
    const response = await s3Client.send(
      new ListObjectsV2Command({ Bucket: "stals" }),
    );
    const output: string[] = [];

    if (response.Contents)
      for (const element of response.Contents) {
        if (element.Key) {
          const e: string = await getSignedUrl(
            s3Client,
            new GetObjectCommand({ Bucket: "stals", Key: element.Key }),
            { expiresIn: 3600 },
          );
          output.push(e);
        }
      }

    return output;
  }),
  fileUploadExample: publicProcedure.query(async () => {
    const params = {
      Bucket: "stals-testing", // The name of the bucket. For example, 'sample-bucket-101'.
      Key: "file1.txt", // The name of the object. For example, 'sample_upload.txt'.
      Body: "Hello world stals!", // The content of the object. For example, 'Hello world!".
      ACL: "public-read",
    };

    try {
      const data = await s3Client.send(
        new CreateBucketCommand({ Bucket: params.Bucket, ACL: params.ACL }),
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const data = await s3Client.send(new PutObjectCommand(params));
    //   return data;
    // } catch (error) {
    //   return error;
    // }
  }),
});

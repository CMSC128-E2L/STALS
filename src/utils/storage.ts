import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";

// Set the AWS Region.
export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

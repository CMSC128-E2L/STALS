import { s3Client } from "~/utils/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.query.file || !req.query.fileType) {
    return;
  }

  if (Array.isArray(req.query.file) || Array.isArray(req.query.fileType)) {
    return;
  }

  const key = req.query.file;
  const contenttype = req.query.fileType;
  console.log(key);
  console.log(contenttype);

  const preSignedUrl: string = await getSignedUrl(
    s3Client,
    new PutObjectCommand({
      Bucket: "stals-testing",
      Key: key,
      ContentType: contenttype,
    }),
    { expiresIn: 30 },
  );

  res.status(200).json({
    url: preSignedUrl,
  });
}

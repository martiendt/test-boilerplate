import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { storageConfig } from "#src/config/storage.js";

export default async (bucket, key) => {
  try {
    const client = new S3Client({
      region: storageConfig.region,
      credentials: {
        accessKeyId: storageConfig.accessKey,
        secretAccessKey: storageConfig.secretKey,
      },
      endpoint: storageConfig.endpoint,
    });

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await client.send(command);

    return response;
  } catch (error) {
    throw error;
  }
};

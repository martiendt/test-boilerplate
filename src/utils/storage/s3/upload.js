import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { storageConfig } from "#src/config/storage.js";

export default async (file, options = {}) => {
  try {
    const client = new S3Client({
      region: storageConfig.region,
      credentials: {
        accessKeyId: storageConfig.accessKey,
        secretAccessKey: storageConfig.secretKey,
      },
      endpoint: storageConfig.endpoint,
    });

    const command = new PutObjectCommand({
      Bucket: storageConfig.bucketName,
      Key: `${uuidv4()}.${mime.extension(file.mimetype)}`,
      Body: file.buffer,
    });

    const response = await client.send(command);

    return response;
  } catch (err) {
    console.log("Error", err);
  }
};

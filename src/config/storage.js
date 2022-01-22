import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV);

export const storageConfig = {
  region: process.env.AWS_REGION,
  bucketName: process.env.AWS_BUCKET_NAME,
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_ENDPOINT,
};

export const storagePrivateConfig = {
  region: process.env.AWS_PRIVATE_REGION,
  bucketName: process.env.AWS_PRIVATE_BUCKET_NAME,
  accessKey: process.env.AWS_PRIVATE_ACCESS_KEY_ID,
  secretKey: process.env.AWS_PRIVATE_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_PRIVATE_ENDPOINT,
};

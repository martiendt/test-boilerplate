import pkg from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { formatUrl } from "@aws-sdk/util-format-url";
import { storageConfig } from "#src/config/storage.js";

export default async (bucket, key) => {
  const { Sha256 } = pkg;
  const credentials = {
    accessKeyId: storageConfig.accessKey,
    secretAccessKey: storageConfig.secretKey,
  };
  const region = storageConfig.region;
  const s3ObjectUrl = parseUrl(`${storageConfig.endpoint}/${bucket}/${key}`);
  const presigner = new S3RequestPresigner({
    credentials,
    region,
    sha256: Sha256,
  });
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
  return formatUrl(url);
};

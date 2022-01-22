import { upload } from "#src/utils/storage/index.js";

export default async (req, res, next) => {
  try {
    const data = await upload(req.file);
    console.log(data.$metadata.httpStatusCode);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

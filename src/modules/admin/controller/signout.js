import { constants } from "http2";
import { upload, download } from "#src/utils/storage/index.js";

export default async (req, res, next) => {
  try {
    const data = await download("", "475170b3-06f6-470b-afe3-46ca1b9db2c4.png");
    return res.json(data);

    res.status(constants.HTTP_STATUS_OK).json();
  } catch (error) {
    next(error);
  }
};

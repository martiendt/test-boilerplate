import { constants } from "http2";
import { upload, download } from "#src/utils/storage/index.js";

export default async (req, res, next) => {
  try {
    const data = await download("pointhub-checkin", "3a48865c-3c5e-49fa-9228-3df506a6e71a.png");

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

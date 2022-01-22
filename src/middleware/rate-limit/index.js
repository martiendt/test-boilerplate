import { create, readAll } from "./model.js";
import { clean as cleanObject } from "#src/utils/object-helper/index.js";

export function rateLimit(options = {}) {
  return async function (req, res, next) {
    const max = 3;

    let data = {
      label: "",
      counter: 0,
      ip: req.ip,
      expiredAt: new Date(),
    };

    let label = data.label;

    if (data.label === "") {
      label = { $exists: false };
    }

    let filter = {
      $and: [{ label }, { ip: req.ip }],
    };

    console.log(filter);

    const response = await readAll({
      filter: filter,
    });

    console.log(response);

    if (response.data.length === 0) {
      // const res2 = await create(data);
    }

    // Check if counter greather than max allowed request
    // if (this.counter > this.max) {
    //   return;
    // }
    return next();
  };
}

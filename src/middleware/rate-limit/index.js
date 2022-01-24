import {
  create as createRateLimit,
  destroyMany as destroyManyRateLimit,
  readAll as readAllRateLimit,
  update as updateRateLimit,
} from "./model.js";
import ApiError from "#src/middleware/error-handler/api-error.js";

export function throttling(
  options = {
    windowMs: 1000 * 60 * 1, // default 1 minutes
    max: 60, // max 60 request / windowMs
    label: "",
  }
) {
  return async function (req, res, next) {
    reset();
    let windowMs = options.windowMs;
    let max = options.max;
    let createdAt = new Date();
    let expiredAt = createdAt;
    expiredAt.setMilliseconds(expiredAt.getMilliseconds() + windowMs);

    let data = {
      label: options.label,
      ip: req.ip,
      counter: 0,
      createdAt: createdAt,
      expiredAt: expiredAt,
    };

    let label = data.label;
    if (data.label === "") {
      label = { $exists: false };
    }

    const response = await readAllRateLimit({
      filter: {
        $and: [{ label }, { ip: req.ip }],
      },
    });

    // record data if there is new request
    if (response.data.length === 0) {
      data.counter++;
      await createRateLimit(data);
      return next();
    }

    // check if counter greather than max allowed request
    if (response.data[0].counter >= max) {
      return next(ApiError.tooManyRequest());
    }

    // request is allowed, increate counter
    response.data[0].counter++;
    await updateRateLimit(response.data[0]._id, response.data[0]);

    return next();
  };
}

// Remove all rate limit that expired
export const reset = async () => {
  const response = await destroyManyRateLimit({
    filter: {
      expiredAt: {
        $lte: new Date().toString(),
      },
    },
  });

  return response;
};

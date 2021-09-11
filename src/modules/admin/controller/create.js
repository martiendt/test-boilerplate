import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { authAdminConfig } from "#src/config/auth.js";
import Connection from "#src/database/connection.js";

export default async (req, res, next) => {
  try {
    Connection.startSession();
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const emailVerficicationCode = crypto.randomBytes(20).toString("hex");
    const createdAt = new Date();

    const collection = Connection.getDatabase().collection("admins");

    await Connection.session.withTransaction(async () => {
      const result = await collection.insertOne(
        {
          email: req.body.email.toLowerCase(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username.toLowerCase(),
          password: hashPassword,
          // system generated value
          emailVerified: false,
          emailVerificationCode: emailVerficicationCode,
          createdAt: createdAt,
        },
        {
          session: Connection.session,
        }
      );

      await Connection.commitTransaction();

      // sign new token
      const token = JWT.sign(
        {
          iss: "express-api-boilerplate",
          sub: result.insertedId,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 30),
        },
        authAdminConfig.secret
      );
      res.status(201).json({
        data: { _id: result.insertedId, token: token },
      });
    }, Connection.transactionOptions);
  } catch (err) {
    next(err);
  } finally {
    await Connection.endSession();
  }
};

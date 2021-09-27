import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { collectionName, restrictedFields } from "../admin.schema.js";
import { authAdminConfig } from "#src/config/auth.js";
import Connection from "#src/database/connection.js";
import queryString from "#src/utils/query-string-mongodb/index.js";

export async function create(data) {
  try {
    Connection.startSession();
    const hashPassword = await bcrypt.hash(data.password, 10);
    const emailVerficicationCode = crypto.randomBytes(20).toString("hex");
    const createdAt = new Date();

    const collection = Connection.getDatabase().collection("admins");
    let result;
    await Connection.session.withTransaction(async () => {
      result = await collection.insertOne(
        {
          email: data.email.toLowerCase(),
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username.toLowerCase(),
          password: hashPassword,
          // system generated value
          emailVerified: false,
          emailVerificationCode: emailVerficicationCode,
          createdAt: createdAt,
          addresses: {
            location: "jl keanngan no 21",
            zipcode: "60054",
          },
        },
        {
          session: Connection.session,
        }
      );

      await Connection.commitTransaction();

      // sign new token
      result.token = JWT.sign(
        {
          iss: "express-api-boilerplate",
          sub: result.insertedId,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 30),
        },
        authAdminConfig.secret
      );

      return result;
    }, Connection.transactionOptions);
    return result;
  } catch (err) {
    console.log(
      err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0]
        .details
    );
    return new Error(err);
  } finally {
    await Connection.endSession();
  }
}

/**
 * Read all data from database
 *
 * @param {Object} query
 * @param {Object} options
 * @return {Object}
 * @public
 */
export async function readAll(
  query,
  options = { includeRestrictedFields: false }
) {
  try {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const collection = Connection.getDatabase().collection(collectionName);

    const cursor = collection
      .find({
        _id: query._id,
      })
      .filter(queryString.filter(query.filter))
      .skip(queryString.skip((page - 1) * limit))
      .limit(queryString.limit(limit))
      .sort(queryString.sort(query.sort))
      .project(
        queryString.fields(
          query.fields,
          options.includeRestrictedFields === false ? restrictedFields : []
        )
      );

    const result = await cursor.toArray();

    const totalDocument = await collection.countDocuments(
      queryString.filter(query.filter)
    );

    return {
      data: result,
      page: page,
      totalPerPage: limit,
      totalDocument: totalDocument,
    };
  } catch (err) {
    return new Error(err);
  }
}

/**
 * Read one data from database
 *
 * @param {String} id
 * @param {Object} query
 * @param {Object} options
 * @return {Object}
 * @public
 */
export async function readOne(
  id,
  query = {},
  options = {
    includeRestrictedFields: false,
  }
) {
  try {
    const collection = Connection.getDatabase().collection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.findOne(filter, {
      projection: queryString.fields(
        query.fields,
        options.includeRestrictedFields === false ? restrictedFields : []
      ),
    });

    return result ?? {};
  } catch (err) {
    return new Error(err);
  }
}

export async function update(id, data = {}, options = { upsert: true }) {
  try {
    const collection = Connection.getDatabase().collection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.updateOne(filter, { $set: data }, options);

    return result;
  } catch (err) {
    return new Error(err);
  }
}

export async function destroy(id) {
  try {
    const collection = Connection.getDatabase().collection(collectionName);

    return await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    return new Error(err);
  }
}

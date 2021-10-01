import { ObjectId } from "mongodb";
import { collectionName, restrictedFields } from "./admin.schema.js";
import Connection from "#src/database/connection.js";
import queryString from "#src/utils/query-string-mongodb/index.js";

export async function create(data) {
  try {
    const createdAt = new Date();

    const collection = Connection.getCollection(collectionName);

    const result = await collection.insertOne(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,

        // system generated value
        emailVerified: false,
        emailVerificationCode: data.emailVerficicationCode,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        session: Connection.session,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Read all data from database
 *
 * @param {Object} query
 * @param {Object} options
 * @returns {Promise<Object>}
 * @public
 */
export async function readAll(query, options = { includeRestrictedFields: false }) {
  try {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const collection = Connection.getCollection(collectionName);

    const cursor = collection
      .find({
        _id: query._id,
      })
      .filter(queryString.filter(query.filter))
      .skip(queryString.skip((query.page - 1) * query.limit))
      .limit(queryString.limit(query.limit))
      .sort(queryString.sort(query.sort))
      .project(queryString.fields(query.fields, options.includeRestrictedFields === false ? restrictedFields : []));

    const result = await cursor.toArray();

    const totalDocument = await collection.countDocuments(queryString.filter(query.filter));

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
 * @returns {Promise<Object>}
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
    const collection = Connection.getCollection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.findOne(filter, {
      projection: queryString.fields(query.fields, options.includeRestrictedFields === false ? restrictedFields : []),
    });

    return result ?? {};
  } catch (err) {
    return new Error(err);
  }
}

export async function update(id, data = {}, options = { upsert: true }) {
  try {
    const collection = Connection.getCollection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.updateOne(filter, { $set: data }, options);

    return result;
  } catch (err) {
    return new Error(err);
  }
}

export async function destroy(id) {
  try {
    const collection = Connection.getCollection(collectionName);

    return await collection.deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    return new Error(err);
  }
}

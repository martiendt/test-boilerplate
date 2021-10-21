import { ObjectId } from "mongodb";
import { collectionName, restrictedFields } from "./schema.js";
import Connection from "#src/database/connection.js";
import { removeEmpty } from "#src/utils/object/index.js";
import queryString from "#src/utils/query-string-mongodb/index.js";

/**
 * Create data
 *
 * @param {Object} data
 * @returns
 */
export async function create(data) {
  try {
    const createdAt = new Date();

    const collection = Connection.getCollection(collectionName);

    let payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      phone: data.phone ?? null,

      // system generated value
      emailVerified: false,
      emailVerificationCode: data.emailVerficicationCode,
      createdAt: createdAt,
      updatedAt: createdAt,
    };

    payload = removeEmpty(payload);

    const result = await collection.insertOne(payload, { session: Connection.session });

    return result;
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
}

/**
 * Update data
 *
 * @param {String} id
 * @param {Object} data
 * @param {Object} options
 * @returns
 */
export async function update(id, data = {}, options = { upsert: true }) {
  try {
    const collection = Connection.getCollection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.updateOne(filter, { $set: data }, options);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function replace(id, data = {}, options = { upsert: true }) {
  try {
    const collection = Connection.getCollection(collectionName);

    const filter = { _id: ObjectId(id) };

    const result = await collection.replaceOne(filter, { $set: data }, options);

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Destroy data
 *
 * @param {String} id
 * @returns
 */
export async function destroy(id) {
  try {
    const collection = Connection.getCollection(collectionName);

    return await collection.deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    throw error;
  }
}

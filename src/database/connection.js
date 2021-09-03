import { MongoClient } from "mongodb";
import databaseConfig from "#src/config/database.js";
import {
  create as createAdminCollection,
  drop as dropAdminCollection,
} from "#src/modules/admin/admin.model.js";
import {
  create as createUserCollection,
  drop as dropUserCollection,
} from "#src/modules/user/user.model.js";
import logger from "#src/utils/logger/index.js";

class Connection {
  constructor() {
    let uri = "";
    /**
     * Use MongoDB Cluster
     * https://docs.mongodb.com/drivers/node/v4.1/quick-start/#create-a-mongodb-cluster
     * Use MongoDB Locally
     * https://docs.mongodb.com/manual/administration/install-community
     */
    if (!databaseConfig.cluster) {
      uri = databaseConfig.host;
    } else {
      `mongodb+srv://${database.username}:${database.password}@${database.host}/${database.name}?retryWrites=true&w=majority`;
    }
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.client = new MongoClient(uri, options);

    this.transactionOptions = {
      readPreference: "primary",
      readConcern: { level: "local" },
      writeConcern: { w: "majority" },
    };
  }

  // Open MongoDB connection
  async open() {
    await this.client.connect();
    this.database = this.client.db(databaseConfig.name);
    logger.info(`Database "${databaseConfig.name}" connected`);
  }

  // Close MongoDB connection
  async close() {
    await this.client.close();
    logger.info(`Database "${databaseConfig.name}" closed`);
  }

  getDatabase() {
    return this.database;
  }

  startSession(session = "session") {
    this[session] = this.client.startSession();
  }

  async commitTransaction(session = "session") {
    await this[session].commitTransaction();
  }

  async abortTransaction(session = "session") {
    await this[session].abortTransaction();
  }

  async endSession(session = "session") {
    await this[session].endSession();
  }

  /**
   * Create Collections
   * ==================
   * Create new collection if not exists and any schema validation or indexes
   */
  async createCollections() {
    await createAdminCollection(this.database);
    await createUserCollection(this.database);
  }

  /**
   * Drop Collections
   * ==================
   * Drop collections function is for testing purpose
   * So every test can generate fresh database
   */
  async dropCollections() {
    await dropAdminCollection(this.database);
    await dropUserCollection(this.database);
  }
}

export default new Connection();

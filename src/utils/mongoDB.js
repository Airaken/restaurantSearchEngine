"use strict";

const { MongoClient } = require("mongodb");

/** Class representing a MongoDB util */
class MongoDB {
  constructor() {
    /** @private */
    this.db = null;

    /** @private */
    this.client = null;
  }

  get instance() {
    return this.db;
  }

  /**
   * Starts a new session on the mongoDB server
   */
  startSession() {
    return this.client.startSession();
  }

  /**
   * Connect to mongoDB using env vars
   */
  async connect({ uri, database }) {
    this.client = await MongoClient.connect(uri);
    this.db = this.client.db(database);
    return this.db;
  }

  /**
   * Get a MongoDB collection object
   * @param {string} collection Collenction name
   */
  collection(collection) {
    if (!this.db) return null;
    return this.db.collection(collection);
  }

  /**
   * Close mongoDB connection.
   * @async
   * @returns {void}
   */
  async disconnect() {
    if (this.client) await this.client.close();
  }
}

module.exports = new MongoDB(); // Export instance to get access to this.db

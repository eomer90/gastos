import { MongoClient } from "mongodb";
import { envs } from "../envs.mjs";

class MongoConnection {
  client;
  db;

  constructor() {
    this.client = new MongoClient(envs.DB_URI);
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(envs.DB_NAME);
    console.log("MongoDB connected");
  }

  async close() {
    await this.client.close();
  }

  get ingresos() {
    return this.db.collection("ingresos");
  }

  get gastos() {
    return this.db.collection("gastos");
  }
}

export default new MongoConnection();

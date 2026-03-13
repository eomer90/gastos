import dotenv from "dotenv";
dotenv.config();

export const envs = {
  DB_URI: process.env.MONGO_DB_URI || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_COLLECTION: process.env.DB_COLLECTION || "",
};

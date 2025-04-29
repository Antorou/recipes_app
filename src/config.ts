import * as dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
console.log("DB_HOST =", process.env.DB_HOST);
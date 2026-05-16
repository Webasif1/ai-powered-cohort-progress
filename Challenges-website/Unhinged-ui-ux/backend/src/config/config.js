import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variable");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in environment variable");
}

if (!process.env.FRONTEND_PORT) {
  throw new Error("FRONTEND_PORT is not defined in environment variable");
}

if (!process.env.MONGOOSE_URI) {
  throw new Error("MONGOOSE_URI is not defined in environment variable");
}

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_PORT: process.env.FRONTEND_PORT,
  MONGOOSE_URI: process.env.MONGOOSE_URI,
};

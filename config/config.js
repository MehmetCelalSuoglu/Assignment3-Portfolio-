// config/config.js
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "DEV_SECRET_KEY",
};

export default config;



import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import logger from "./logger";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const mongouri = process.env.MONGODB_URI || "";

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }), cors());

async function connectToDatabase() {
  try {
    await mongoose.connect(mongouri);
    logger.info("Connected to MongoDB database!");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  app.use("/api", routes);
  app.listen(PORT, () =>
    logger.info(` Server ready at: http://localhost:${PORT}`)
  );
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";
import logger from "./logger";

dotenv.config();
const app = express();

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use("/api", routes);
app.listen(3000, () =>
  logger.info(`🚀 Server ready at: http://localhost:3000`)
);

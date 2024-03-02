// middleware/requestLogger.js
import { Request, Response } from "express";
import logger from "../logger"; // Adjust the import path as necessary
import { getDurationInMilliseconds } from "./timeUtils";
const logRequestAndResponseTime = (req: Request, res: Response, next: any) => {
  const startTime = process.hrtime();

  logger.info(`Received ${req.method} request at '${req.originalUrl}'`);

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(startTime);
    logger.info(
      `${req.method} request to '${
        req.originalUrl
      }' took ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  next();
};

export default logRequestAndResponseTime;

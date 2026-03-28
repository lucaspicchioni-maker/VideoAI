import { Queue } from "bullmq";
import { redis } from "./connection";

export const trendQueue = new Queue("trend-detection", { connection: redis });
export const contentQueue = new Queue("content-production", { connection: redis });
export const distributionQueue = new Queue("distribution", { connection: redis });
export const analyticsQueue = new Queue("analytics", { connection: redis });

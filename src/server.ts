// src/server.ts
import dotenv from "dotenv";
import { app } from "./app";
import { connectDatabase } from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 8083;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`📊 StatisticsService running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start StatisticsService", error);
    process.exit(1);
  }
}

startServer();


import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const PORT = env.PORT || 5000;

async function startServer() {
  if (!env.ACCESS_TOKEN_SECRET || !env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be set in .env"
    );
    process.exit(1);
  }

  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();

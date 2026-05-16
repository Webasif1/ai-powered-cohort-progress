import app from "./src/app.js";
import { config } from "./src/config/config.js";

app.listen(config.PORT, () => {
  try {
    console.log(`
  ╔════════════════════════════════════════════╗
  ║  🚀 Server Started Successfully!           ║
  ╠════════════════════════════════════════════╣
  ║  Port:        ${config.PORT}                   ║
  ║  Environment: ${config.NODE_ENV}              ║
  ║  URL:         http://localhost:${config.PORT}    ║
  ╚════════════════════════════════════════════╝
      `);
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
});

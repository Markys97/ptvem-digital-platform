// src/server.js
const config = require("./config");
const createApp = require("./app");

(async () => {
  try {
    const app = await createApp();

    app.listen(config.port, () => {
      console.log(
        `🚀 ${config.appName} running on http://localhost:${config.port} [${config.env}]`
      );
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();

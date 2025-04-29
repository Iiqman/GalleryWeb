const app = require("./app");
const db = require("./models");
const fs = require("fs");
const path = require("path");

// Ensures tmp upload directory exists
const tmpUploads = path.join(__dirname, "/tmp/uploads");
if (!fs.existsSync(tmpUploads)) {
  fs.mkdirSync(tmpUploads, { recursive: true });
}

// Port
const PORT = process.env.PORT || 5000;

// Sync database
db.sequelize.sync()
  .then(() => {
    console.log("Database synced successfully");
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err.message);
  });

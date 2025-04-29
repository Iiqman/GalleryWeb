const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, "", { // Kosongkan password
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.albums = require("./album.model.js")(sequelize, Sequelize);
db.photos = require("./photo.model.js")(sequelize, Sequelize);
db.preferences = require("./preference.model.js")(sequelize, Sequelize);

// Relationships
db.users.hasMany(db.albums, { as: "albums" });
db.albums.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

db.users.hasMany(db.photos, { as: "photos" });
db.photos.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

db.albums.hasMany(db.photos, { as: "photos" });
db.photos.belongsTo(db.albums, {
  foreignKey: "album_id",
  as: "album"
});

db.users.hasOne(db.preferences, { as: "preferences" });
db.preferences.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "user"
});

module.exports = db;
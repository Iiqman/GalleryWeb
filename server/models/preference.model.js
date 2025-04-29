module.exports = (sequelize, Sequelize) => {
  const Preference = sequelize.define("preference", {
    user_id: {
      type: Sequelize.INTEGER
    },
    gallery_layout: {
      type: Sequelize.ENUM('grid', 'list'),
      defaultValue: 'grid'
    }
  }, {
    timestamps: false,
    tableName: 'user_preferences'
  });

  return Preference;
};
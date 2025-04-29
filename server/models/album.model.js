module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false,
    tableName: 'albums'
  });

  return Album;
};
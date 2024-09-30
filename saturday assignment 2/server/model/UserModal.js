const { DataTypes } = require('sequelize');
const Sequelize = require('../dbconfig/dbConfig');

const User = Sequelize.define(
  'Users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
);

(async () => {
  await Sequelize.sync();
})();

module.exports = User;

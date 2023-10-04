'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resume.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Resume.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Resume',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Resume;
};

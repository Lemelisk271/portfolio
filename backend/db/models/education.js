'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Education.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Education.init({
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING
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
    modelName: 'Education',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Education;
};

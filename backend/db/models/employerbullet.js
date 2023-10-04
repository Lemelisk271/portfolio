'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployerBullet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployerBullet.belongsTo(models.Employer, {
        foreignKey: 'employerId'
      })
    }
  }
  EmployerBullet.init({
    bullet: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    employerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employers',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'EmployerBullet',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return EmployerBullet;
};

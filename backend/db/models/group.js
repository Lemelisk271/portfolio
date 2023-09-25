'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, {
        as: 'Organizer',
        foreignKey: 'organizerId'
      })
      Group.belongsToMany(models.User, {
        as: 'Members',
        through: models.Membership,
        foreignKey: 'groupId',
        otherKey: 'userId'
      })
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId'
      })
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId'
      })
      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      })
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        len: [0,60]
      }
    },
    about: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM('In person', 'Online'),
      defaultValue: 'In person'
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      validate: {
        len: [2,2],
        isAlpha: true,
        isUppercase: true
      }
    }
  }, {
    sequelize,
    modelName: 'Group'
  });
  return Group;
};

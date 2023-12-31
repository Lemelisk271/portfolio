'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Project.hasMany(models.ProjectBullets, {
        foreignKey: 'projectId'
      })
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    liveLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256],
        isUrl: true
      }
    },
    repoLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256],
        isUrl: true
      }
    },
    cloneLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256],
        isUrl: true
      }
    },
    cloneName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256],
        isUrl: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    frontend: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    backend: {
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
    modelName: 'Project',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Project;
};

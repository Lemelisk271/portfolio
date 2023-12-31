'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      liveLink: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      repoLink: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      cloneLink: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      cloneName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      frontend: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      backend: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Projects"
    await queryInterface.dropTable(options);
  }
};

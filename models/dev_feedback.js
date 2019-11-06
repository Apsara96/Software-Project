const Sequelize = require('sequelize')
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'dev_feedback',
    {
        project_ID: {
            type: Sequelize.INTEGER
        },
        developer_ID: {
            type: Sequelize.INTEGER
        },
        client_ID: {
            type: Sequelize.INTEGER
        },
        feedback: {
            type: Sequelize.STRING
        },
    },
    {
        timestamp: false,
        freezeTableName: true
    }
)
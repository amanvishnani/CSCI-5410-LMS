const sequelize = require('../db')
const Sequelize = require('sequelize')
const Model = Sequelize.Model;

class Challenge extends Model {}

Challenge.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'c_id'
    },
    text: {
        type: Sequelize.STRING,
        field: 'text'
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    }
}, {
    sequelize,
    tableName: "Challenge"
})

Challenge.sync()

module.exports = Challenge
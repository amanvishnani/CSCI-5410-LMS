const sequelize = require('../db')
const Sequelize = require('sequelize')
const Model = Sequelize.Model;

class Org extends Model {}

Org.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING
    }
}, {
    sequelize
})

Org.sync()

module.exports = Org
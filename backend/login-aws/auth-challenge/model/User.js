const sequelize = require('../db')
const Sequelize = require('sequelize')
const Model = Sequelize.Model;

const Org = require('./Org')

class User extends Model {}

User.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    emailId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        field: 'email_id'
    },
    orgId: {
        type: Sequelize.INTEGER,
        field: 'org_id'
    }
}, {
    sequelize
})

User.belongsTo(Org, {
    foreignKey: 'orgId'
})

User.sync()

module.exports = User
const sequelize = require('../db')
const Sequelize = require('sequelize')
const Model = Sequelize.Model;

class OnlineUsers extends Model {}

OnlineUsers.init({
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER
    },
    orgId: {
        field: 'org_id',
        type: Sequelize.INTEGER
    }
}, {
    sequelize,
    tableName:'OnlineUsers',
    timestamps: false
})

OnlineUsers.removeAttribute("id")

module.exports = OnlineUsers
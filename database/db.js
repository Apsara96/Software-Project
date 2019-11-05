const Sequelize = require("sequelize")
const db = {}
//const sequelize = new Sequelize("mysql://b7ac7508864695:baa4a581@us-cdbr-iron-east-05.cleardb.net/heroku_68d032e51218807?reconnect=true")
const sequelize = new Sequelize("uDevs","root","",{
    host:"localhost",
    dialect:"mysql",
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize 

module.exports = db
const dbConfig = require("../DB/db.config.js")
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( dbConfig.database , dbConfig.username , dbConfig.password,
    {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
        pool: {
        max: dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
})

module.exports = sequelize;
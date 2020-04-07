/*
 * @Author: your name
 * @Date: 2020-04-04 16:20:29
 * @LastEditTime: 2020-04-04 18:17:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/db/types.js
 */
const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
}
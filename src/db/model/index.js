/*
 * @Author: your name
 * @Date: 2020-04-04 18:13:19
 * @LastEditTime: 2020-04-09 23:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/db/model/index.js
 */
const User = require('./User')
const Blog = require('./Blog')


Blog.belongsTo(User, {
    foreignKey: 'userId'
})


module.exports = {
    User,
    Blog
}
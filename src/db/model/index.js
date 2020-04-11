/*
 * @Author: your name
 * @Date: 2020-04-04 18:13:19
 * @LastEditTime: 2020-04-11 09:52:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/db/model/index.js
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})
UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})


module.exports = {
    User,
    Blog,
    UserRelation
}
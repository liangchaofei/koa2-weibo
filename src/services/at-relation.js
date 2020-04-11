/*
 * @Author: your name
 * @Date: 2020-04-11 21:53:15
 * @LastEditTime: 2020-04-11 21:55:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/services/at-relation.js
 */


const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

module.exports = {
    createAtRelation,
}

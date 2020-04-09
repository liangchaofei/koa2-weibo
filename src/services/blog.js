/*
 * @Author: your name
 * @Date: 2020-04-09 23:54:10
 * @LastEditTime: 2020-04-09 23:54:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/services/blog.js
 */

const { Blog } = require('../db/model/index')
 /**
 * 创建微博
 * @param {Object} param0 创建微博的数据 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}
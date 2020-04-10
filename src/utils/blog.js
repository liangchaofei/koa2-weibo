/*
 * @Author: your name
 * @Date: 2020-04-10 23:11:38
 * @LastEditTime: 2020-04-10 23:12:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/utils/blog.js
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 根据 blogList 渲染出 html 字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}
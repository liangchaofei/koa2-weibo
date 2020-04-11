/*
 * @Author: your name
 * @Date: 2020-04-09 23:53:11
 * @LastEditTime: 2020-04-10 00:02:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/blog-home.js
 */


const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
    // 分析并收集 content 中的 @ 用户
    // content 格式如 '哈喽 @李四 - lisi 你好 @王五 - wangwu '
    // const atUserNameList = []
    // content = content.replace(
    //     REG_FOR_AT_WHO,
    //     (matchStr, nickName, userName) => {
    //         // 目的不是 replace 而是获取 userName
    //         atUserNameList.push(userName)
    //         return matchStr // 替换不生效，预期
    //     }
    // )

    // // 根据 @ 用户名查询用户信息
    // const atUserList = await Promise.all(
    //     atUserNameList.map(userName => getUserInfo(userName))
    // )

    // // 根据用户信息，获取用户 id
    // const atUserIdList = atUserList.map(user => user.id)

    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        // 创建 @ 关系
        // await Promise.all(atUserIdList.map(
        //     userId => createAtRelation(blog.id, userId)
        // ))

        // 返回
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}
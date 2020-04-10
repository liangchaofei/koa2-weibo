/*
 * @Author: your name
 * @Date: 2020-04-09 23:54:10
 * @LastEditTime: 2020-04-10 23:20:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/services/blog.js
 */

const { Blog , User } = require('../db/model/index')
const { formatUser } = require('./_format')
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

// 获取微博列表
async function getBlogListByUser({userName,pageIndex = 0 ,pageSize=10}){
    // 拼接查询条件
    const userWhereOpts = {

    }
    if(userName){
        userWhereOpts.userName = userName
    }
    // 执行查询
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize * pageIndex,
        // order:['id','desc'],
        include:[{
            model:User,
            attributes:['userName','nickName','picture'],
            where:userWhereOpts
        }]
    })

    let blogList = result.rows.map(row=>row.dataValues);
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues;
        blogItem.user = formatUser(user)
        return blogItem;
    })

    return {
        count:result.count,
        blogList
    }
}
module.exports = {
    createBlog,
    getBlogListByUser
}
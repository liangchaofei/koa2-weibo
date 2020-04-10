/*
 * @Author: your name
 * @Date: 2020-04-10 22:41:06
 * @LastEditTime: 2020-04-10 22:55:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/blog-profile.js
 */

 const { getBlogListByUser } = require('../services/blog')
 const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

async function getProfileBlogList(userName,pageIndex=0){
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const blogList = result.blogList;
    return new SuccessModel({
        isEmpty: blogList.length ===0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count:result.count
    })
}

module.exports = {
    getProfileBlogList
}
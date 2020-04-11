/*
 * @Author: your name
 * @Date: 2020-04-11 10:03:23
 * @LastEditTime: 2020-04-11 10:16:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/user-relation.js
 */

 // 用户关系
 const { getUsersByFollower } = require('../services/user-relation')
 const { SuccessModel,ErrorModel} = require('../model/ResModel')
 
 async function getFnas(userId){
    // service
    const { count,userList} = await getUsersByFollower(userId)
 
    return new SuccessModel({
        count,fansList
    })
}


 module.exports = {
    getFnas
 }
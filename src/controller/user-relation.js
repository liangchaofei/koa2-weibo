/*
 * @Author: your name
 * @Date: 2020-04-11 10:03:23
 * @LastEditTime: 2020-04-11 11:01:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/user-relation.js
 */

 // 用户关系
 const { getUsersByFollower,addFollower,deleteFollower } = require('../services/user-relation')
 const { SuccessModel,ErrorModel} = require('../model/ResModel')
 const { addFollowerFailInfo,deleteFollowerFailInfo } = require('../model/ErrorInfo')
 
 async function getFnas(userId){
    // service
    const { count,userList} = await getUsersByFollower(userId)
 
    return new SuccessModel({
        count,fansList
    })
}

async function follow(myUserId,curUserId){
    try{
        addFollower(myUserId,curUserId)
        return new SuccessModel()
    }catch(err){
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}
 module.exports = {
    getFnas,
    follow,
    unFollow
 }
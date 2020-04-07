/*
 * @Author: your name
 * @Date: 2020-04-04 20:30:08
 * @LastEditTime: 2020-04-07 22:42:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/user.js
 */

 // user controller
const { getUserInfo } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo') 
// userName 
 async function isExist(userName){
     const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new SuccessModel(userInfo)
    }else{
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

 module.exports = {
    isExist
 }
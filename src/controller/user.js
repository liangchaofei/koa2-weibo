/*
 * @Author: your name
 * @Date: 2020-04-04 20:30:08
 * @LastEditTime: 2020-04-07 23:20:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/user.js
 */

 // user controller
const { getUserInfo,createUser } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo') 

const doCrypto = require('../utils/cryp')
// userName 
 async function isExist(userName){
     const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new SuccessModel(userInfo)
    }else{
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}


/**
 *@param 
 *
 * @param {*} {userName,password,gender}
 */
async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new ErrorModel(registerUserNameExistInfo)
    }

    try{
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    }catch(err){
        console.error(err.message,err.stack)
        return new ErrorModel(registerFailInfo)
    }
}
 module.exports = {
    isExist,
    register
 }
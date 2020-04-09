/*
 * @Author: your name
 * @Date: 2020-04-04 20:30:08
 * @LastEditTime: 2020-04-09 23:02:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/controller/user.js
 */

 // user controller
const { getUserInfo,createUser,deleteUser,updateUser } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { 
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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
 * 修改个人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
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

// 登陆
async function login(ctx,userName,password){
    const userInfo = await getUserInfo(userName,doCrypto(password))
    console.log('userInfo',userInfo)
    if(!userInfo){
        return new ErrorModel(loginFailInfo);
    }

    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel()
}

// 删除当前用户
async function deleteCurrUser(userName){
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)
}
 module.exports = {
    isExist,
    register,
    login,
    deleteCurrUser,
    changeInfo,
    changePassword,
    logout
 }
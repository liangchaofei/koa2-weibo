/*
 * @Author: liangchaofei
 * @Date: 2020-04-04 20:38:06
 * @LastEditTime: 2020-04-09 22:47:54
 * @LastEditors: Please set LastEditors
 * @Description: user services
 * @FilePath: /koa2-weibo/src/services/user.js
 */

 const { User } = require('../db/model/index')
const { formatUser }  = require('./_format')
 
 // 获取用户信息

 async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

async function createUser({userName,password,gender=3,nickName}){
    const result = await User.create({
        userName,
        password,
        nickName:nickName ? nickName: userName,
        gender
    })

    return result.dataValues;
}

// 删除当前用户
async function  deleteUser(userName){
    const result = await User.destroy({
        where:{
            userName
        }
    })
    return result>0;
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}

 module.exports= {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
 }
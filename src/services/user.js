/*
 * @Author: liangchaofei
 * @Date: 2020-04-04 20:38:06
 * @LastEditTime: 2020-04-07 22:31:26
 * @LastEditors: Please set LastEditors
 * @Description: user services
 * @FilePath: /koa2-weibo/src/services/user.js
 */

 const { User } = require('../db/model/index')
const { formatUser }  = require('./_format')
 
 // 获取用户信息

 async function getUserInfo(userName,password){
     // 查询条件
     const  whereOpt = {
        userName
     }
     if(password){
         Object.assign(whereOpt,{password})
     }

     // 查询
     const result = await User.findOne({
         attributes: ['id','userName','nickName', 'picture','city'],
         where: whereOpt
     })

     if(result === null){
         // 未找到
         return result;
     }
    // 格式化
    const formatRes = formatUser(result.dataValues)
     return formatRes;
 }

 module.exports= {
    getUserInfo
 }
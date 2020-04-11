/*
 * @Author: your name
 * @Date: 2020-04-11 10:04:13
 * @LastEditTime: 2020-04-11 10:19:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/services/user-relation.js
 */

 // 用户关系
const { User,UserRelation} = require('../db/model/index')
const { formatUser } = require('./_format')
 // 获取用户粉丝
 async function getUsersByFollower(followerId){
    const result = await User.findAndCountAll({
        attributes:['id','userName','nickName','picture'],
        order:[['id','desc']],
        includes:[{
            model:UserRelation,
            where:[
                followerId
            ]
        }]
    })

    let userList = result.rows.map(row=>row.dataValues);
    userList = formatUser(userList);

    return {
        count:result.count,
        userList
    }
 }

 module.exports = {
    getUsersByFollower
 }
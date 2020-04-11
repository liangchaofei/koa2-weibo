/*
 * @Author: your name
 * @Date: 2020-04-11 10:04:13
 * @LastEditTime: 2020-04-11 11:02:01
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


 async function addFollower(userId,followerId){
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues;
 }

 /**
 * 删除关注关系
 * @param {number} userId 用户 id
 * @param {number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

 module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
 }
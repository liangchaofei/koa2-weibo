/*
 * @Author: your name
 * @Date: 2020-04-04 16:16:20
 * @LastEditTime: 2020-04-04 18:16:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/db/model/User.js
 */
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    picture: {
        type: STRING,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }
})

module.exports = User

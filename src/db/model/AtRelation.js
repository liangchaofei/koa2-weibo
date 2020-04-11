/*
 * @Author: your name
 * @Date: 2020-04-11 21:40:12
 * @LastEditTime: 2020-04-11 21:40:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/db/model/AtRelation.js
 */
const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 Id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博 Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 默认未读
        comment: '是否已读'
    }
})

module.exports = AtRelation
/*
 * @Author: your name
 * @Date: 2020-04-10 00:03:54
 * @LastEditTime: 2020-04-10 00:06:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/validator/blog.js
 */
const validate = require('./validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

/**
 * 校验微博数据格式
 * @param {Object} data 微博数据
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate
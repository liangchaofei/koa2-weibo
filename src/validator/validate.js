/*
 * @Author: your name
 * @Date: 2020-04-07 23:34:02
 * @LastEditTime: 2020-04-07 23:35:18
 * @LastEditors: Please set LastEditors
 * @Description: json schema 校验
 * @FilePath: /koa2-weibo/src/validator/validate.js
 */
const Ajv = require('ajv')
const ajv = new Ajv({
    // allErrors: true // 输出所有的错误（比较慢）
})

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate
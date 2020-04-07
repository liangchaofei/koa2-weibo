/*
 * @Author: your name
 * @Date: 2020-04-07 23:44:24
 * @LastEditTime: 2020-04-07 23:50:30
 * @LastEditors: Please set LastEditors
 * @Description: json schema 验证中间价
 * @FilePath: /koa2-weibo/src/middlewares/validator.js
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
function genValidator(validateFn){
    async function validator(ctx,next){
        // 校验
        const data = ctx.request.body;
        const error = validateFn(data)
        if(error){
            // 失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return;
        }
        // 成功
        await next()
    }
  
    return validator
}

module.exports = {
    genValidator
}
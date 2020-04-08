/*
 * @Author: your name
 * @Date: 2020-04-08 20:52:11
 * @LastEditTime: 2020-04-08 20:55:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/middlewares/loginChecks.js
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
 // 登陆验证中间件
 
 async function loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        // 已登陆
        await next()
        return;
    }

    // 未登陆
    ctx.body = new ErrorModel(loginCheckFailInfo)
 }


 async function loginRedirect(ctx,next){
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
 }
 module.exports = {
    loginCheck,
    loginRedirect
}
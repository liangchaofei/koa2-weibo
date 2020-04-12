/*
 * @Author: your name
 * @Date: 2019-09-14 15:57:12
 * @LastEditTime: 2020-04-12 22:47:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/user.js
 */
/**
 * @description user view 路由
 * @author 双越老师
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
    console.log('ctx.session.userInfo',ctx.session.userInfo)
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router

/*
 * @Author: your name
 * @Date: 2020-04-08 00:24:37
 * @LastEditTime: 2020-04-08 22:38:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/user.js
 */
const router = require('koa-router')();
const {loginRedirect } = require('../../middlewares/loginChecks')

// 获取登陆信息
function getLoginInfo(ctx){
    let data = {
        isLogin:false
    }
    const userInfo = ctx.session.userInfo;

    if(userInfo){
        data = {
            isLogin: true,
            userName:userInfo.userName
        }
    }
    return data;
}
router.get('/login',async (ctx, next) => {
    await ctx.render('login',getLoginInfo(ctx))
})

router.get('/register',async (ctx,next) => {
    await ctx.render('register',getLoginInfo(ctx))
})

router.get('/setting',loginRedirect, async (ctx,next ) => {
    console.log('ctx.session.userInfo',ctx.session.userInfo)
    await ctx.render('setting',ctx.session.userInfo)
})
module.exports = router;
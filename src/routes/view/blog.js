/*
 * @Author: your name
 * @Date: 2020-04-09 23:33:18
 * @LastEditTime: 2020-04-09 23:37:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/blog.js
 */
const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/',async (ctx,next) => {
    await ctx.render('index',{})
})

module.exports = router;
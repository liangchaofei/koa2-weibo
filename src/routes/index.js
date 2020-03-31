/*
 * @Author: your name
 * @Date: 2020-03-29 23:54:07
 * @LastEditTime: 2020-03-31 11:16:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/index.js
 */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // const session = ctx.session;
  // if(session.viewNum == null){
  //   session.viewNum = 0;
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    // num:session.viewNum
  }
})

module.exports = router

/*
 * @Author: your name
 * @Date: 2020-03-30 23:45:53
 * @LastEditTime: 2020-03-30 23:56:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/routes/view/error.js
 */
const router = require('koa-router')()

// 故意制造一个错误
router.get('/get-an-error', async (ctx, next) => {
  throw Error()
  ctx.body = {
    msg: 'xxx'
  }
})
console.log('err')
// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
/*
 * @Author: your name
 * @Date: 2020-04-04 18:28:27
 * @LastEditTime: 2020-04-07 22:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/api/user.js
 */


 const router = require('koa-router')()
 const { isExist } = require('../../controller/user')

 router.prefix('/api/user')


 // 注册
 router.post('/register', async (ctx,next) => {

 })

 // 用户是否存在
 router.post('/isExits', async (ctx,next) => {
    const { userName }  = ctx.request.body;
    ctx.body = await isExist(userName)
})

 module.exports = router;
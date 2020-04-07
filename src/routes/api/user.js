/*
 * @Author: your name
 * @Date: 2020-04-04 18:28:27
 * @LastEditTime: 2020-04-08 00:19:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/api/user.js
 */


 const router = require('koa-router')()
 const { isExist,register,login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
 router.prefix('/api/user')


 // 注册
 router.post('/register',genValidator(userValidate), async (ctx,next) => {
    const { userName, password, gender} = ctx.request.body;

    ctx.body = await register({
        userName,
        password,
        gender
    })
 })

 // 用户是否存在
 router.post('/isExits', async (ctx,next) => {
    const { userName }  = ctx.request.body;
    ctx.body = await isExist(userName)
})

// 登陆
router.post('/login',(ctx,next) => {
    const { userName,password} = ctx.request.body; 
    ctx.body = await login(ctx,userName,password)
}) 
 module.exports = router;
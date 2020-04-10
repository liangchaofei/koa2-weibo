/*
 * @Author: your name
 * @Date: 2020-04-09 23:33:18
 * @LastEditTime: 2020-04-10 23:17:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/blog.js
 */
const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/',loginRedirect,async (ctx,next) => {
    await ctx.render('index',{})
})

// ????
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

// ????
router.get('/profile/:userName',loginRedirect,async (ctx,next) => {

    const {userName:curUserName} = ctx.params;
    const result = await getProfileBlogList( curUserName,
        0)
        const { isEmpty,count,pageSize,pageIndex,blogList} = result;
    await ctx.render('profile',{
        blogData:{
            isEmpty,count,pageSize,pageIndex,blogList
        }
    })
})

module.exports = router;
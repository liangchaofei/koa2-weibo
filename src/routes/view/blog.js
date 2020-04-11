/*
 * @Author: your name
 * @Date: 2020-04-09 23:33:18
 * @LastEditTime: 2020-04-11 10:21:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/blog.js
 */
const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getFnas } = require('../../controller/user-relation')
// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

// ????
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

// ????
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

    // ????????
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        // ???????
        curUserInfo = myUserInfo
    } else {
        // ????????
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // ??????
            return
        }
        // ?????
        curUserInfo = existResult.data
    }

    const result = await getProfileBlogList(curUserName,0)
    const { isEmpty, count, pageSize, pageIndex, blogList } = result;

    // ????
    const fansResult = await getFnas(curUserInfo.id);
    const { count:fansCount,fansList} = fansResult.data;
    await ctx.render('profile', {
        blogData: {
            isEmpty, count, pageSize, pageIndex, blogList
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count:fansCount,
                list:fansList
            }
        }
    })
})

// ??
router.get('/square', loginRedirect, async (ctx, next) => {
    // ??????????
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router;
/*
 * @Author: your name
 * @Date: 2020-04-09 23:33:18
 * @LastEditTime: 2020-04-11 22:31:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/view/blog.js
 */
const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getHomeBlogList }= require('../../controller/blog-home')
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getFans ,getFollowers} = require('../../controller/user-relation')
const { getAtMeCount,getAtMeBlogList, markAsRead } = require('../../controller/blog-at')
// ??
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // ???????
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // ????
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // ???????
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    // ?? @ ??
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// ????
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

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
    const fansResult = await getFans(curUserInfo.id);
    const { count:fansCount,fansList} = fansResult.data;

    // ???????
    const followersResult = await getFollowers(curUserInfo.id);
    const {count:followersCount,followersList } = followersResult.data;
    // ??????
    const amIFollowed = fansList.some(item => item.userName === myUserName)


     // 获取 @ 数量
     const atCountResult = await getAtMeCount(myUserInfo.id)
     const { count: atCount } = atCountResult.data
     
    await ctx.render('profile', {
        blogData: {
            isEmpty, count, pageSize, pageIndex, blogList
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count:fansCount,
                list:fansList,
            },
            followersData:{
                count:followersCount,
                list:followersList
            },
            amIFollowed,
            atCount
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


// atMe 路由
router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    // 获取第一页列表
    const result = await getAtMeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 渲染页面
    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

    // 标记为已读
    if (atCount > 0) {
        await markAsRead(userId)
    }
})

module.exports = router;
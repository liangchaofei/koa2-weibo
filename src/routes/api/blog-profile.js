/*
 * @Author: your name
 * @Date: 2020-04-10 23:03:25
 * @LastEditTime: 2020-04-10 23:14:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/routes/api/blog-profile.js
 */
const router= require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx,next) => {
    let {userName,pageIndex} = ctx.params;
    pageIndex = parseInt(pageIndex)
    const result =await getProfileBlogList(userName,pageIndex)

    // 渲染为html模版字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result;
})
module.exports = router;
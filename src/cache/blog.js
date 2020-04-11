/*
 * @Author: your name
 * @Date: 2020-04-11 09:22:47
 * @LastEditTime: 2020-04-11 09:25:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/cache/blog.js
 */
const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 获取缓存成功
        return cacheResult
    }

    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })

    // 设置缓存，过期时间 1min
    set(key, result, 60)

    return result
}

module.exports = {
    getSquareCacheList
}

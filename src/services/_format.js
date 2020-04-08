/*
 * @Author: liangchaofei
 * @Date: 2020-04-07 22:19:48
 * @LastEditTime: 2020-04-08 22:45:25
 * @LastEditors: Please set LastEditors
 * @Description: 数据格式化
 * @FilePath: /koa2-weibo/src/services/_format.js
 */

const { DEFAULT_PICTURE } = require('../conf/db')
function _formatUserPicture(obj) {
    console.log('aaa',obj)
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    return _formatUserPicture(list)
}
 module.exports = {
     formatUser
 }
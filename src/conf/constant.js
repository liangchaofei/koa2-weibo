/*
 * @Author: your name
 * @Date: 2020-04-07 22:27:41
 * @LastEditTime: 2020-04-11 21:24:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/conf/constant.js
 */

 // 常量

 module.exports = {
     DEFAULT_PICTURE: 'https://dwz.cn/rnTnftZs',
     PAGE_SIZE:5,
     // 正则表达式，匹配 '@昵称 - userName'
    REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
 }
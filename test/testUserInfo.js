/*
 * @Author: your name
 * @Date: 2020-04-10 00:12:53
 * @LastEditTime: 2020-04-10 23:24:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/test/testUserInfo.js
 */
/**
 * 【特别提醒】cookie 是用户的敏感信息，此处只能是**测试**用户的 cookie
 * 每次测试用户重新登录，都需要更新这里的 cookie
 */

module.exports = {
    Z_ID: 1,
    Z_USER_NAME: 'aaa',
    Z_COOKIE: 'weibo.sid=v46sHraCLDVCoMs9A7_VPDEtC2ll0ru2; weibo.sid.sig=KTzEUbB9rDmFMW63TG7juxssuW8',

    L_ID: 2,
    L_USER_NAME: 'lisi',
    L_COOKIE: 'weibo.sid=686m0u92zMTCmmSQY85trYv_PScDgpFx; weibo.sid.sig=Za_Oj-wSLFrG5QzQhqQU0YQxOFo'
}
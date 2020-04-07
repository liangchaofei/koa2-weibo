/*
 * @Author: your name
 * @Date: 2020-04-07 23:12:36
 * @LastEditTime: 2020-04-07 23:19:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/src/utils/cryp.js
 */

 // 加密方法

 const crypto = require('crypto');
 const { CRYPTO_SECRET_KEY} = require('../conf/secretKeys')


 /**
  * md5
  *
  */
 function _md5(content){
     const md5 =crypto.createHash(md5)
     return md5.update(content).digest('hex')
 }

function doCrypto(content){
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto;
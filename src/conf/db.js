/*
 * @Author: your name
 * @Date: 2020-03-30 22:50:46
 * @LastEditTime: 2020-03-30 23:10:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/conf/eb.js
 */

// 存储配置

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    // 线上的 mysql 配置
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'koa2_weibo_db'
  }

}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
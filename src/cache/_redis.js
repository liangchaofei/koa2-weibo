/*
 * @Author: your name
 * @Date: 2020-03-30 22:45:56
 * @LastEditTime: 2020-03-30 22:50:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/cache/_redis.js
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * redis set
 * @param {string} key  键
 * @param {string} val  值
 * @param {*} timeout 过期时间，单位s
 */
function set (key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

function get  (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err,val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
      }
      try {
        resolve(
          // 尝试吧取出来的值变成对象
          JSON.parse(val)
        ) 
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
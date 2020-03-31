/*
 * @Author: your name
 * @Date: 2020-03-29 23:54:07
 * @LastEditTime: 2020-03-31 11:19:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/app.js
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const session = require('koa-generic-session');
// const storeRedis = require('koa-redis');
// const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

const errorViewRouter = require('./routes/view/error')
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
// app.keys = ['dadas_233j']
// app.use(session({
//   key: 'weibo.sid', // cookie name 默认是 'koa.sid'
//   prefix: 'weibo:sess:', // redis key的前缀，默认是 'koa:sess:'
//   cookie:{
//     path: '/',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000,
//   },
//   store:storeRedis({
//     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//   })
// }))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 写在最后

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

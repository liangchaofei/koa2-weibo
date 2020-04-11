/*
 * @Author: your name
 * @Date: 2020-03-29 23:54:07
 * @LastEditTime: 2020-04-11 22:52:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/app.js
 */
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const storeRedis = require('koa-redis');
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

const atAPIRouter = require('./routes/api/blog-at')
const squareAPIRouter = require('./routes/api/blog-square')
const profileApiRouter = require('./routes/api/blog-profile')
const errorViewRouter = require('./routes/view/error')
const homeApiRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const index = require('./routes/index')
const users = require('./routes/view/user')

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
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 'koa.sid'
  prefix: 'weibo:sess:', // redis key的前缀，默认是 'koa:sess:'
  cookie:{
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  store:storeRedis({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(atAPIRouter.routes(),atAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(),squareAPIRouter.allowedMethods())
app.use(profileApiRouter.routes(),profileApiRouter.allowedMethods())
app.use(homeApiRouter.routes(),homeApiRouter.allowedMethods())
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 写在最后

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

/*
 * @Author: your name
 * @Date: 2020-03-30 22:54:44
 * @LastEditTime: 2020-04-04 18:17:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weibo-koa2/src/db/sync.js
 */

// 同步数据库
const seq = require('./seq.js');

require('./model/index');

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth error',err)
});

// 执行同步
// force: true 表示 如果数据库 已经存在该数据表，会删掉重新建
seq.sync({ force: true}).then(() => {
  console.log('sync ok')
  process.exit();
});
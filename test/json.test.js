/*
 * @Author: your name
 * @Date: 2020-03-31 11:13:41
 * @LastEditTime: 2020-03-31 11:18:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/test/json.test.js
 */

const server = require('./server')

 test('json 接口数据格式返回挣钱',async () => {
     const res = await server.get('/json');
     expect(res.body).toEqual({
         title: 'koa2 json'
     })
 })
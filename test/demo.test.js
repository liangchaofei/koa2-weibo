/*
 * @Author: your name
 * @Date: 2020-03-31 11:00:14
 * @LastEditTime: 2020-03-31 11:01:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/test/demo.test.js
 */

 function sum(a,b){
     return a+b;
 }
 
 test('10 + 20 等于 30',() => {
     const res = sum(10,20)
     expect(res).toBe(30)
 })
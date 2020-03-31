/*
 * @Author: your name
 * @Date: 2020-03-31 11:10:28
 * @LastEditTime: 2020-03-31 11:14:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /koa2-weibo/test/server.js
 */
const request =require('supertest');
const server = require('../src/app').callback()

module.exports = request(server)
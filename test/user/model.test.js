/*
 * @Author: your name
 * @Date: 2020-04-08 21:07:34
 * @LastEditTime: 2020-04-08 21:11:12
 * @LastEditors: Please set LastEditors
 * @Description: user model test
 * @FilePath: /koa2-weibo/test/user/model.test.js
 */


 const { User } = require('../../src/db/model/index') 

test('user 模型的各个属性，符合预期',() => {
    const user = User.build({
        userName:'aaa',
        password:'123',
        nickName: 'test',
        picture:'/xxx.xxx',
        city:'beijing'
    })
    // 验证各个属性
    expect(user.userName).toBe('aaa')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('test')
    expect(user.picture).toBe('/xxx.xxx')
    expect(user.city).toBe('beijing')
})
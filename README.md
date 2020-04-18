# 实现一个简易新浪微博

先看下效果图：

登陆页面：

![image-20200417230654767](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417230654767.png)

注册页面：

![image-20200417230711059](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417230711059.png)

首页：

![image-20200417231105950](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417231105950.png)

广场：

![image-20200417231209888](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417231209888.png)

我的空间：

![image-20200417231237274](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417231237274.png)

设置：

![image-20200417231250818](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417231250818.png)

技术选型：koa2+mysql+session+ejs+redis+jest



创建koa开发环境:

1. npm i koa-generator -g

2. koa2 -e my_weibo

3. cd my_weibo

4. npm i

5. npm run dev 打开127.0.0.1:3000即可

6. 安装npm i cross-env -D 来设置环境变量

7. 在package.json增加 npm scripts

   ​    "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",

   ​    "prd": "cross-env NODE_ENV=production pm2 start bin/www",

8. 在根目录新建src文件夹，将public,routes,views,app.js放到src中，

9. 修改bin/www中 var app = require('../app');  改为 var app = require('../src/app');

最后的目录结构如下：

![image-20200417232018917](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200417232018917.png)



创建数据库:

1. 创建数据库koa2_weibo_db
2. users表

| Column   | Type        | 主键 | 是否不为空 | 自动增加 | Default | 注释   |
| -------- | ----------- | ---- | ---------- | -------- | ------- | ------ |
| id       | int         | Y    | Y          | Y        |         | 主键id |
| username | varchar(20) |      | Y          |          |         | 用户名 |
| password | varchar(20) |      | Y          |          |         | 密码   |
| nickname | varchar(10) |      | Y          |          |         | 昵称   |

3.blogs表

| column  |    Type     | 主键 | 是否不为空 | 自动增加 | Default | 注释   |
| :-----: | :---------: | :--: | :--------: | :------: | :-----: | ------ |
|   id    |     int     |  Y   |     Y      |    Y     |         | 主键id |
| tiitle  | varchar(50) |      |     Y      |          |         | 标题   |
| content |    text     |      |     Y      |          |         | 内容   |
| userid  |     int     |      |     Y      |          |         | 用户id |

4.粉丝表

|   column   | Type | 主键 | 是否不为空 | 自动增加 | default | 注释         |
| :--------: | :--: | :--: | :--------: | :------: | :-----: | ------------ |
|     id     | int  |  Y   |     Y      |    Y     |         | 主键id       |
|   userId   | int  |      |     Y      |          |         | 用户id       |
| followerId | int  |      |     Y      |          |         | 被关注用户id |

5.@用户表

| columnd | type | 主键 | 是否不为空 | 自动增加 | Default | 注释     |
| :-----: | ---- | ---- | ---------- | -------- | ------- | -------- |
|   id    | int  | Y    | Y          | Y        |         | 主键id   |
| userId  | int  |      | Y          |          |         | 用户id   |
| blogId  | int  |      | Y          |          |         | 博客id   |
| isRead  | Bool |      | Y          |          |         | 是否阅读 |

配置eslint

1. 安装: npm i eslint babel-eslint -D

2. 在根目录新建.eslintrc.json，配置eslint规则

   ```
   {
       "parser": "babel-eslint",
       "env": {
         "es6": true,
         "commonjs": true,
         "node": true
       },
       "rules": {
         "indent": ["error", 2], // 换行缩进
         "quotes": [
           "error",
           "single",
           {
             "allowTemplateLiterals": true   // es6的 模板字符串 ``
           }
         ]
       }
     }
   ```

3. 在根目录新建.eslintignore，配置忽略文件

   ```
   node_modules
   test
   src/public
   ```

4. 增加lint npm scripts

   ```
   "scripts": {
       "start": "node bin/www",
       "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
       "prd": "cross-env NODE_ENV=production pm2 start bin/www",
       "lint": "eslint --ext .js ./src",
       "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
   },
   ```



增加pre-commit

1. 安装: npm i pre-commit -D

2. 在package.json中增加pre-commit

   ```
   "pre-commit":[
       "lint"
   ]
   ```



增加inspect和断点

1. 修改dev scripts: 增加 --inspect=9229
2. npm run dev
3. 打开chrome://inspect即可调试



session

1. session存储到redis中

2. 安装： npm i koa-redis koa-generic-session --save

3. 使用session。在app.js中

4. 开启redis：redis-server 开发过程中必须开启

   ```javascript
   const session = require('koa-generic-session');
   const storeRedis = require('koa-redis');
   const { REDIS_CONF } = require('./conf/db')
   
   // session配置
   app.keys = ['dadas_233j']
   app.use(session({
     key: 'weibo.sid', // cookie name 默认是 'koa.sid'
     prefix: 'weibo:sess:', // redis key的前缀，默认是 'koa:sess:'
     cookie:{
       path: '/',
       httpOnly: true,
       maxAge: 24 * 60 * 60 * 1000,
     },
     // ttl:24 * 60 * 60 * 1000,
     store:storeRedis({
       all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
     })
   }))
   ```

   

jest单元测试

1. 安装： npm i jest --save-dev

2. 增加npm scripts

   ```
   "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
   ```

3. 在根目录创建test/demo.test.js。注意：必须以*.test.js结尾

   ```
    function sum(a,b){
        return a+b;
    }
    
    test('10 + 20 等于 30',() => {
        const res = sum(10,20)
        expect(res).toBe(30)
    })
   ```

4. 执行npm run test。即可看到测试结果哦.

   ![image-20200331110243497](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200331110243497.png)

5. 测试http接口

6. 安装：npm i supertest -D

7. 新建test/server.js

   ```
   const request =require('supertest');
   const server = require('../src/app').callback()
   
   module.exports = request(server)
   ```

8. 新建test/json.test.js

```
const server = require('./server')

 test('json 接口数据格式返回挣钱',async () => {
     const res = await server.get('/json');
     expect(res.body).toEqual({
         title: 'koa2 json'
     })
 })
```

 9. 执行npm run test

    ![image-20200331112023938](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200331112023938.png)



数据表设计

![image-20200331161946949](/Users/liangchaofei/Library/Application Support/typora-user-images/image-20200331161946949.png)

以users表为例：

```javascript
const User = seq.define('user', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    picture: {
        type: STRING,
        comment: '头像，图片地址'
    },
    city: {
        type: STRING,
        comment: '城市'
    }
})

module.exports = User
```



开始写代码：

1.登陆页面和登陆接口

​	1.1 在/router/view下写页面的路由,在/router/api 下写接口的路由

```javascript
// /routes/view/user.js
router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})
```

​	1.2 注册路由

```javascript
// app.js
const userViewRouter = require('./routes/view/user')
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
```

​	1.3 登陆接口

```javascript
// /routes/api/user.js
// 登录
import { login } from '../../controller/user'
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

// /controller/user.js

const { getUserInfo } = require('../services/user')
async function login(ctx, userName, password) {
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

// /services/user.js

async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}
```

​	1.4 通过上面登陆页面和登陆接口就写好了，这里是采用了MVC模式。

​	1.5 总结下开发接口模式：

​			1. 在/routes/view/user.js 写页面路由

​			2. 在app.js 注册页面路由

​			3. 在/routes/api/user.js 写接口路由，返回给前端的数据

​			4. 在app.js注册接口路由

​			5. 在/controller/user.js 中写业务逻辑

​			6. 在/services/user.js 写数据库操作



## 2.注册页面

### 1. 写判断用户名是否存在接口，步骤同登陆接口

```javascript
// /routes/api/user.js
// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// /controller/user.js
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { errno: 0, data: {....} }
        return new SuccessModel(userInfo)
    } else {
        // { errno: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

// /services/user.js
async function getUserInfo(userName, password) {
    // 查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        // 未找到
        return result
    }

    // 格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}
```

### 2.写注册接口，步骤同登陆接口。



## 3.个人设置页面

### 1.修改个人信息接口

​	1.1 下面的loginCheck是一个检测是否登陆的中间件。

```javascript
const { loginCheck } = require('../../middlewares/validator')
// /routes/api/user.js
// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// /controller/user.js
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    console.log('result',result)
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

// /services/user.js
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}
```



### 2.修改密码接口,步骤同上。

### 3.退出登陆接口,步骤同上。



## 4.广场页面

1.初始化第一页数据，先从redis读缓存数据，没有的话再去数据库读数据

```javascript
// /routes/vies/blog.js
// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// /controller/blog-square.js
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

// /cache/blog.js
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 获取缓存成功
        return cacheResult
    }

    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })

    // 设置缓存，过期时间 1min
    set(key, result, 60)

    return result
}

// services/blog.js
async function getBlogListByUser(
    { userName, pageIndex = 0, pageSize = 10 }
) {
    // 拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组

    // 获取 dataValues
    let blogList = result.rows.map(row => row.dataValues)

    // 格式化
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}
```

2. 加载更多接口

```javascript
// /routes/api/blog-square.js

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

// ...同第一次加载数据
```



## 5.我的博客页面

1.获取第一页数据

2.获取粉丝数据

3.获取关注数据

4.获取@数据

```javascript
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data

    // 我是否关注了此人？
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(myUserInfo.id)
    const { count: atCount } = atCountResult.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed,
            atCount
        }
    })
})
```

5.关注和取消关注

```javascript
// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unFollow(myUserId, curUserId)
})
```



## 6.首页

1.获取第一页数据

2.获取粉丝数据

3.获取关注数据

4.获取@数据

```javascript
// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
```

5.创建微博

​	1.创建数据模型

​	2.模版和路由

​	3.开发接口

​	4.单元测试

```javascript
// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

// 单元测试
test('创建一条微博，成功', async () => {
    // 定义测试内容
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    // 开始测试
    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})
```



配置线上环境:pm2



pm2 list 

pm2 restart xxx 

Pm2 stop xxx

Pm2 delete xxx

pm2 info xxx

pm2 log



配置pm2

1.在根目录创建pm2.config.json

```
{
    "apps": {
        "name": "weibo",
        "script": "bin/www",
        "watch": true,
        "ignore_watch": [
            "node_modules",
            "logs",
            "uploadFiles"
        ],
        "instances": 4,
        "error_file": "./logs/err.log",
        "out_file": "./logs/out.log",
        "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
}
```

2.修改npm scripts

```
"prd": "cross-env NODE_ENV=production pm2 start pm2.config.json",
```

3.运行 npm run prod



nginx代理

1.静态文件服务器

2.负载均衡

3.反向代理



nginx总结：

/usr/local/etc/nginx/nginx.conf

命令

Nginx -t

Nginx 

nginx -s reload








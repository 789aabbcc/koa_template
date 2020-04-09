const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require("koa2-cors")

const session = require('./config/session')
// 接口地址
const route = require('./router')

// error handler
onerror(app)

app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// Token拦截中间件,必须写在路由前面
/**
 * 设置不token检测的接口
 */
const excludeURL = [
  "/login",
  "/register"
]
function inArray(search, Array) {
  for (let i in Array) {

    if (search.startsWith(Array[i])) {
      return true;
    }
    return false;
  }
}

app.use(async (ctx, next) => {
  let url = ctx.request.url;
  if (inArray(url, excludeURL)) {
    await next();
    return;
  }

  let token;

  //接收token
  if (ctx.request.query.token) {
    token = ctx.request.query.token;
  } else if (ctx.request.header.token) {
    token = ctx.request.header.token;
  } else {
    ctx.response.body = {
      msg: "未登录禁止访问"
    }
    return;
  }

  if (!token) {
    ctx.body = {
      code: -10086,
      message: '未认证'
    }
    return;
  }

  // 将前端传回的token直接进行解析
  const user_info = session[token];
  if (!user_info || user_info.expire_in - new Date().getTime() < 0) {
    ctx.body = {
      code: -10010,
      message: '非法token'
    }
    return;
  }

  // 请求成功，将token时间重置
  session[token].expire_in = new Date().getTime() + 1000 * 60 * 60;

  // 将解析后的token保存到ctx.user_info中，以供接口使用
  ctx.user_info = user_info;
  await next();


})

// routes
app.use(route);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000, () => {
  console.log("服务器3000端口启动成功!");
})

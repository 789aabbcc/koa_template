const DB = require("../dbhelper/db");
const uuidv4 = require('uuid/v4');
const session = require('../config/session')

/**
 * 登陆功能
 */

exports.doLogin = async (ctx, next) => {

  // 获取到前端发送回来的 nick_name 和 password 
  let parmas = ctx.request.body.nick_name;
  let result = await DB.select_admin(parmas);

  if (result.length > 0) {
    if (result[0].password == ctx.request.body.password) {

      // 将登陆成功的状态和user_id存入session
      let access_token = uuidv4();

      session[access_token] = {
        user_id: result[0].user_id,
        expire_in: new Date().getTime() + 1000 * 60 * 60
      };

      ctx.response.body = {
        access_token,
        status_code: '200',
        state: '登录成功',
        code: '1'
      }
    }
    else {
      ctx.response.body = {
        status_code: '200',
        state: '登录失败，密码错误',
        code: '-1'
      }
    }
  } else {
    ctx.response.body = {
      status_code: '200',
      state: '登录失败，用户名不存在',
      code: '0'
    }
  }

};


/**
 * 执行注册(测试完成后删除)
 */
exports.doRegister = async (ctx, next) => {

  let admin_user_id = uuidv4().replace(/-/g, '');
  let password = ctx.request.body.password;
  let nick_name = ctx.request.body.nick_name;
  let addSqlParams = [admin_user_id, password, nick_name];
  let result = await DB.add_admin(addSqlParams);

  console.log(result);
  let access_token = uuidv4();

  session[access_token] = {
    user_id: admin_user_id,
    expire_in: new Date().getTime() + 1000 * 60 * 60
  };

  if (result.length != '') {
    ctx.response.body = {
      access_token,
      status_code: '200',
      state: '注册成功',
      code: '1'
    }
  } else {
    ctx.response.body = {
      status_code: '200',
      state: '注册失败',
      code: '-1'
    }
  }

};

/**
 * 执行删除(测试完成后删除)
 */
exports.doDelete = async (ctx, next) => {

  let conditions = ctx.request.body.nick_name;
  let result = await DB.delete_admin(conditions);
  console.log(result);

  if (result) {
    ctx.response.body = {
      status_code: '200',
      state: '删除成功',
      code: '1'
    }
  } else {
    ctx.response.body = {
      status_code: '200',
      state: '删除失败',
      code: '-1'
    }
  }

};

/**
 * 执行注销
 */
exports.doCancel = async (ctx, next) => {

  ctx.user_info.expire_in = 0

  ctx.response.body = {
    status_code: '200',
    state: '注销成功',
    code: '1'
  }
};





/**
 * 前端路由表
 */
const router = require('koa-router')();
const control = require("./controllers/control");

// 返回项目详情
router.get("/getProjectMain", control.getProjectMain)

module.exports = router.routes();

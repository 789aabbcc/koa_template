const DB = require("../dbhelper/db");

// 返回项目详情
exports.getProjectMain = async (ctx, next) => {

    let projectId = ctx.request.query.projectId
    let result = await DB.find("projects", `projectId=${projectId}`)
    ctx.body = {
        result,
        code: "1",
        descript: "获取成功"
    }
}
const mysql = require("mysql");


let config = mysql.createConnection({
    host: "127.0.0.1",   // 数据库的地址
    user: "root",        // 数据库用户名
    password: "root",    // 数据库密码
    port: "3306",        // mysql数据库的端口号
    database: "DataBase"      // 使用那个数据库
})

config.connect();
// 这里也可以像mongodb一样写返回参数，各种连接不成功的
console.log("数据库连接成功");

module.exports = config;

const config = require('../config/dataBase');
// sql查询表中数据总条：SELECT COUNT(*) FROM 表名称。
// 返回大于 20 岁的人数：
// SELECT COUNT(*) FROM Personsinfo WHERE Age>20


// 获取数据库中人数等总数目
exports.get_count = function (table_name, condition) {
    let sql = `SELECT COUNT(*) AS count FROM ` + table_name + ` WHERE ` + condition;
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(result[0]);
            console.log(result);
            config.release//释放链接
        })

    })
}
// 获取数据库中总数目
exports.counts = function (table_name) {
    let sql = `SELECT COUNT(*) AS count FROM ` + table_name;
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            resolve(result[0]);
            console.log(result);
            config.release//释放链接
        })

    })
}
// 条件查
exports.find = function (table_name, condition) {
    // 条件搜索
    if (arguments.length === 2) {
        var sql = "SELECT * FROM " + table_name + " WHERE " + condition;
    } else {
        // 无条件搜索
        var sql = "SELECT * FROM " + table_name;
    }

    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}

// 投影查询
exports.find_fuzzy = function (table_name, column, condition) {

    if (arguments.length === 3) {
        var sql = `SELECT ` + column + ` FROM ` + table_name + ` WHERE ` + condition;
    } else {
        var sql = `SELECT ` + column + ` FROM ` + table_name;
    }

    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}
// 多表联合查询(每个必须都对应,就是每条数据都得有对应的数据)
exports.find_two = function (colunm, table_name1, table_name2, condition1, condition2) {
    let sql = `select * from ${table_name1} inner join ${table_name2} on ${table_name1}.${condition1}=${table_name2}.${condition2} where ${table_name1}.articleId = ${colunm}`;
    console.log(sql)
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}

// 排序以及分页查询
exports.find_paging = function (table_name, column, condition, sort, count, start_count) {
    let sql = ` SELECT ` + column + ` FROM ` + table_name + ` WHERE ` + condition + ` ORDER BY ` + sort + ` LIMIT ` + count + ` OFFSET ` + start_count;
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}
// 模糊查询
exports.find_like_paging1 = function (column, table_name, condition1, condition2, count, start_count) {

    if (condition2 == '') {
        var sql = `select ${column} from ${table_name} where( types = '${condition1}' ) ` + ` LIMIT ` + count + ` OFFSET ` + start_count

    } else {
        var sql = `select ${column} from ${table_name} where( title like '%${condition2}%') ` + ` LIMIT ` + count + ` OFFSET ` + start_count
    }

    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}
// 模糊查询
exports.find_like_paging2 = function (column, table_name, condition1, condition2, count, start_count) {
    let sql = `select ${column} from ${table_name} where( types = '${condition1}' AND title like '%${condition2}%') ` + ` LIMIT ` + count + ` OFFSET ` + start_count
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })

    })
}

// 改
exports.update = function (table, newParams, conditions) {
    // 修改一条
    if (arguments.length === 3) {
        var updateSql = "UPDATE " + table + " SET " + newParams + " WHERE " + conditions;
    } else {
        var updateSql = "UPDATE " + table + " SET " + newParams;
    }
    return new Promise((resolve, reject) => {
        config.query(updateSql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                config.release//释放链接
            }
        })

    })
}


// 删
exports.delete = function (table_name, condition) {
    let sql = `DELETE FROM ` + table_name + ` WHERE ` + condition;
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })
    })
}


// 增加
exports.add = function (table_name, column, values) {
    let sql = `INSERT INTO ` + table_name + `(` + column + `) VALUES (` + values + `)`;
    return new Promise(function (resolve, reject) {
        config.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
            console.log(result);
            config.release//释放链接
        })
    })
}

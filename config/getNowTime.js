
// 获取当前时间2020-08-24
exports.getNowTime = async (ctx, next) => {

    let date = new Date();

    let year = date.getFullYear(); //获取完整的年份(4位)


    let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

    let day = date.getDate(); //获取当前日(1-31)

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    let result = year + '-' + month + '-' + day;

    return result
}


// 获取当前时间2020-08-24 18:23:33
exports.getNowTimes = async (ctx, next) => {
    let date = new Date();

    let year = date.getFullYear(); //获取完整的年份(4位)


    let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)

    let day = date.getDate(); //获取当前日(1-31)

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    let hours = date.getHours(); //获取当前小时数(0-23)

    let minutes = date.getMinutes(); //获取当前分钟数(0-59)

    let seconds = date.getSeconds(); //获取当前秒数(0-59)

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    let result = year + '-' + month + '-' + day + ' ' + hours + ":" + minutes + ":" + seconds;

    return result
}
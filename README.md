# koa_template

## 项目初始化
```
npm install
```

### 项目启动
```
nodemon app.js
```


### 使用
1. 修改在config文件夹中的dataBase.js中的MySQL数据库配置
2. 先了解dbhelper文件夹中的db.js中封装的MySQL增删改查方法,想加自己可以封装sql语句
3. 在controllers文件夹中的control.js中编写逻辑代码并暴露出去
4. 在根目录下的router.js中将刚刚暴露的方法使用,并写对应的接口


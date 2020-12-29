# 开始搭建
npm init
npm i nodemon -S
npm i koa koa-json koa-touter koa-logger -S
mpm i mongoose

# 如需支持 import
npm i @babel/core @babel/node babel-preset-env babel-register -D
### 然后在根目录下创建  .babelrc 文件，文件内容为：
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
### 在 package.json 文件中 执行命令 添加 ‘--exec babel-node’

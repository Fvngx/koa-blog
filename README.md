# Koa + ts + mysql

## 1.初始化项目

```js
npm init
yarn add koa @types/koa koa-router @types/koa-router
yarn add ts-node typescript -D
```

- 需使用单元测试，需一个方法是用 koa

## 2.使用 nodemon 热加载

```js
yarn add nodemon -D
```

- 需要创建 nodemon.json 文件 ：

```js
{
  "watch": ["src/**/*.ts", "utils/**/*.ts", "./app.ts"],
  "ignore": ["node_modules"],
  "exec": "ts-node app.ts",
  "ext": ".ts"
}
```

## 3.jest 单元测试

```js
yarn add jest @types/jest ts-jest -D
```

#### 安装 supertest 网络测试

```js
yarn add supertest @types/supertest -D
```

## 4.dotenv 加载配置信息

```js
yarn add dotenv @types/dotenv
```

## 5.log4js 手机日志

```js
yarn add log4js @types/log4js
```

## 6.orm 框架 sequelize

```js
yarn add @types/node @types/validator
yarn add sequelize reflect-metadata sequelize-typescript
```

## 7.jwt 认证 jsonwentoken: 加密/解密

```js
yarn add jsonwebtoken @types/jsonwebtoken
```

## 8.数据校验

```js
yarn add async-validator
```

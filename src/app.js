import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import cors from 'koa-cors'
import basdata from "./db/base"
import normal from './middleware/normalerror'
import router from './routers'

const app = new Koa()

mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(json())
app.use(bodyParser())
app.use(normal)


// 链接MongoDB
mongoose.connect(basdata.mburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('数据库链接成功');
}).catch(err => {
  console.log('数据库链接失败')
})

// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000)

console.log('启动成功')

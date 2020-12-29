import koarouter from 'koa-router'
import UserName from '../../models/username'
import {
  chregister,
  chlogin
} from '../../config/checking'
import initdata from '../../config/initdata'

const router = new koarouter()

// 注册的路由
router.post('/register', async ctx => {
  console.log('注册接口')
  console.log(ctx.request.body)
  const {name, password, state} = ctx.request.body
  new chregister(ctx,name,password,state).chregisterFun()

  const user = new UserName({
    name,
    password,
    state
  })
  // 存储到 数据库
  await user.save()
      .then(res => {
        console.log('注册成功')
        new initdata(ctx, '注册成功').listing()
      })
      .catch(e => {
        console.log('失败');
        new initdata(ctx).tips('注册失败', 500)
      })
})

// 登录的路由
router.post('/login', async ctx => {
  console.log(ctx.request.body)
  let {name, password} = ctx.request.body
  // 参数校验
  new chlogin(ctx, name, password).chloginFun()

  // 查询集合有没有注册的改账号
  let listdata = await UserName.find({name, password})
  if (listdata.length === 0) {
    new initdata(ctx).tips('账号或密码错误', 202)
  } else {
    new initdata(ctx, 'SUCCESS', listdata[0].id, 200).listing()
  }
})

export default router.routes()

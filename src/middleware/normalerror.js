import result from '../config/resultdata'

const normalerror = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log('捕获异常')
    const isresult = err instanceof result
    if (isresult) {
      console.log('已知错误')
      ctx.body = {
        msg: err.msg,
        s: '-1'
      }
      ctx.status = err.code
    } else {
      console.log('未知错误')
      console.log(err)
      if (err.field) {
        ctx.body = {
          msg: '图片参数不正确',
          s: '-1'
        }
        ctx.status = 400
        return false
      }
      ctx.body = {
        msg: '服务器发生错误',
        s: '00040',
      }
      ctx.code = 500
    }
  }
}

export default normalerror
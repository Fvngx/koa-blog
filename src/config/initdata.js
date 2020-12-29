class initdata {
  constructor(ctx, msg='sucess', data=[], code=200) {
    this.ctx = ctx
    this.msg = msg
    this.data = data
    this.code = code
  }

  // 200 的正确返回
  listing() {
    this.ctx.body = {
      msg: this.msg,
      data: this.data,
      s: '1'
    }
    this.ctx.status = this.code
  }

  tips(tipmsg, codes) {
    this.ctx.body = {
      msg: tipmsg,
      s: '-1'
    }
    this.ctx.status = codes
  }
}

export default initdata
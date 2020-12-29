// 校验：参数、空、数字类型，undefined、空格、手机号、密码
import result from './resultdata'

class checking {
  constructor(ctx, ...obj) {
    console.log(obj)
    this.ctx = ctx
    this.obj = obj
  }

  // 校验前端开发者参数错误，为undefined
  Errunder() {
    console.log(this.obj.indexOf(undefined))
    const bvc = this.obj.indexOf(undefined)
    if (bvc !== -1) {
      throw new result('参数填写错误, 不能为空', 400)
    }
  }

  // 校验用户填写为空
  Parameter(list) {
    const bvc = this.obj.indexOf('')
    if (bvc !== -1) {
      throw new result(list[bvc], 202)
    }
  }

  // 校验空格符号
  Blank(list) {
    const vbn = this.obj.filter(item => {
      return item.split(' ').join('').length === 0
    })
    const bvc = this.obj.indexOf(vbn[0])
    if (bvc !== -1) {
      throw new result(list[bvc], 202)
    }
  }

  // 校验图片未上传
  Checkimg() {
    if (this.ctx.req.file === undefined) {
      throw new result('请上传图片', 202)
    }
  }

  // 校验参数为数字类型
  Checknumber(list, numarr=0) {
    let numbering
    if (numarr !== 0) {
      numbering = numarr
    } else {
      numbering = this.obj
    }

    const vbn = numbering.filter(item => {
      return isNaN(item)
    })

    const bvc = numbering.indexOf(vbn[0])
    if (bvc !== -1) {
      throw new result(list[bvc], 202)
    }
  }

  // 校验手机号
  Phone(mobile) {
    const phone = /^1[3456789]\d{9}$/
    if (!phone.test(this.obj[0])) {
      throw new result(mobile, 202)
    }
  }

  // // 密码验证：6-20位数字和字母的组合
  // Password(pass) {
  //   const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6, 20}/
  //   if (!reg.test(this.obj[1])) {
  //     throw new result(pass, 202)
  //   }
  // }
}

// 注册
class chregister extends checking {
  constructor(ctx, ...obj) {
    super(ctx, ...obj)
  }
  chregisterFun() {
    this.Errunder()
    // this.Phone('请填写正确的手机号码')
    // this.Password('密码必须由6-20位数字和字母的组合')
  }
}

// 登录
class chlogin extends checking {
  constructor(ctx, ...obj) {
    super(ctx, ...obj)
  }
  chloginFun() {
    const arr = ['请填写手机号', '请填写密码']
    this.Errunder()
    this.Parameter(arr)
    this.Blank(arr)
  }
}

module.exports = {
  chregister,
  chlogin
}
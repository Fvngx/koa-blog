import { Rules } from 'async-validator';
import { Context } from 'koa';
import validate from '../../utils/validate';
import response from '../../utils/response';
import { createHash } from 'crypto';
import AdminService from '../service/AdminService';
import { IAdmin } from '../model/Admin';
import { sign } from '../../utils/auth';

class AdminController {
  // 注册管理员
  async register(ctx: Context) {
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '用户名不能为空',
      },
      password: [
        {
          type: 'string',
          required: true,
          message: '用户密码不能为空',
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不可以小于6位',
        },
      ],
      // email: {
      //   type: 'string',
      //   required: true,
      //   message: '用户名不能为空',
      // },
      // mobile: {
      //   type: 'string',
      //   required: true,
      //   message: '用户名不能为空',
      // },
    };
    const { data, error } = await validate<IAdmin>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }
    // data.password = createHash('md5')
    //   .update(data.password as string)
    //   .digest('hex');
    // console.log(data);
    const admin = await AdminService.getAdminByName(data.name as string);
    if (admin !== null) {
      return response.error(ctx, '账号已存在！');
    }
    console.log(`register data: ${data}`);
    const row = await AdminService.addAdmin(data);
    if (row.id > 0) {
      const { id, name, mobile, email, createdAt, updatedAt } = row;
      const admin = { id, name, mobile, email, createdAt, updatedAt };
      return response.seccess(ctx, admin);
    }
    return response.error(ctx, '创建失败');
  }
  // 管理员登录
  async login(ctx: Context) {
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '用户名不能为空',
      },
      password: [
        {
          type: 'string',
          required: true,
          message: '用户密码不能为空',
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不可以小于6位',
        },
      ],
    };

    const { data, error } = await validate<IAdmin>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }
    const admin = await AdminService.getAdminByName(data.name as string);

    // data.password = createHash('md5')
    //   .update(data.password as string)
    //   .digest('hex');
    // console.log(data);
    if (admin === null || admin.password !== data.password) {
      return response.error(ctx, '账号或密码错误');
    }
    const token = sign(data);
    const { id, name, createdAt, updatedAt, email, mobile, avatar } = admin;
    const user = { id, name, createdAt, updatedAt, email, mobile, avatar };
    return response.seccess(ctx, { user, token }, '登录成功');
  }
  // 修改管理信息
  async update(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const rules: Rules = {};
    const { data, error } = await validate<IAdmin>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }

    const rows = await AdminService.updateAdmin(id, data);
    if (rows[0] > 0) {
      const admin = await AdminService.getAdminById(id);
      return response.seccess(ctx, admin);
    }

    response.error(ctx, '修改失败');
  }
}

export default new AdminController();

import { Context } from 'koa';
import { ICategory } from '../model/Category';
import response from '../../utils/response';
import CategoryService from '../service/CategoryService';
import { Rules } from 'async-validator';
import validate from '../../utils/validate';

class CategoryController {
  // 新增
  async add(ctx: Context) {
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '分类名不能为空',
      },
    };
    const { data, error } = await validate<ICategory>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }

    const row = await CategoryService.addCategory(data);
    if (row.id > 0) {
      return response.seccess(ctx, row);
    }
    return response.error(ctx, '新增失败');
  }
  // 修改
  async update(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '分类名不能为空',
      },
    };
    const { data, error } = await validate<ICategory>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }
    const rows = await CategoryService.updateCategory(id, data);
    if (rows[0] > 0) {
      data.id = id;
      return response.seccess(ctx, data);
    }
    return response.error(ctx, '分类不存在');
  }
  // 删除
  async del(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const row = await CategoryService.delCategory(+id);
    if (row > 0) {
      return response.seccess(ctx, { id });
    }
    return response.error(ctx, '该分类不存在');
  }
  // 详情
  async detail(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const category: ICategory | null = await CategoryService.detailCategory(id);
    if (category === null) {
      return response.error(ctx, '分类不存在');
    } else if ((category as any).id > 0) {
      return response.seccess(ctx, category);
    }
    return response.error(ctx, '未知错误');
  }
  // 获取列表
  async list(ctx: Context) {
    const params = ctx.request.query;
    const list = await CategoryService.getCategoryList(params);
    return response.seccess(ctx, list);
  }
}

export default new CategoryController();

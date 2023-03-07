import { Context } from 'koa';
import { Rules } from 'async-validator';
import validate from '../../utils/validate';
import response from '../../utils/response';
import { ITag } from '../model/Tag';
import TagService from '../service/TagService';

class TagController {
  // 新增
  async add(ctx: Context) {
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '标签名不能为空',
      },
    };

    const { data, error } = await validate<ITag>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }

    const row = await TagService.addTag(data);
    if (row.id > 0) {
      return response.seccess(ctx, row);
    }
    return response.error(ctx, '新增失败');
  }
  // 更新
  async update(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const rules: Rules = {
      name: {
        type: 'string',
        required: true,
        message: '标签名不能为空',
      },
    };

    const { data, error } = await validate<ITag>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }

    const rows = await TagService.updateTag(id, data);

    if (rows[0] > 0) {
      data.id = id;
      return response.seccess(ctx, data);
    }
    return response.error(ctx, '该分类不存在');
  }
  // 删除
  async del(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const row = await TagService.delTag(+id);
    if (row > 0) {
      return response.seccess(ctx, { id });
    }
    return response.error(ctx, '操作失败');
  }
  // 详情
  async detail(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const tag: ITag | null = await TagService.detailTag(+id);
    if (tag === null) {
      return response.error(ctx, '该分类不存在');
    } else if ((tag as any).id > 0) {
      return response.seccess(ctx, tag);
    }
    return response.error(ctx, '未知错误');
  }
  // 列表
  async list(ctx: Context) {
    const params = ctx.request.query;
    const list = await TagService.getTagList(params);
    return response.seccess(ctx, list);
  }
}

export default new TagController();

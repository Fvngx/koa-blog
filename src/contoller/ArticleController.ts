import { Context } from 'koa';
import validate from '../../utils/validate';
import response from '../../utils/response';
import ArticleService from '../service/ArticleService';
import { IArticle } from '../model/Article';
import { Rules } from 'async-validator';

class ArticleController {
  // 新建文章
  async add(ctx: Context) {
    const rules: Rules = {
      title: {
        type: 'string',
        required: true,
        message: '文章标题不能为空',
      },
    };
    const { data, error } = await validate<IArticle>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }
    console.log(data);
    if (data.t_id) {
    }

    const row = await ArticleService.addArticle(data);
    if (row.id > 0) {
      return response.seccess(ctx, row);
    }
    return response.error(ctx, '创建失败');
  }
  // 更新修改文章
  async update(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const rules: Rules = {
      title: {
        type: 'string',
        required: true,
        message: '文章标题不能为空',
      },
    };
    const { data, error } = await validate<IArticle>(ctx, rules);
    if (error !== null) {
      return response.error(ctx, error);
    }

    const rows = await ArticleService.updateArticle(id, data);
    console.log(rows);
    if (rows[0] > 0) {
      data.id = id;
      return response.seccess(ctx, data);
    }
    return response.error(ctx, '文章不存在');
  }
  // 删除文章
  async del(ctx: Context) {
    const id = (ctx.request as any).params.id;

    const row = await ArticleService.delArticle(id);

    if (row > 0) {
      return response.seccess(ctx, { id });
    }
    return response.error(ctx, '该文章不存在');
  }
  // 文章详情
  async detail(ctx: Context) {
    const id = (ctx.request as any).params.id;
    const article: IArticle | null = await ArticleService.getArticleDetail(id);
    if (article === null) {
      return response.error(ctx, '文章不存在');
    } else if ((article as any).id > 0) {
      return response.seccess(ctx, article);
    }
    return response.error(ctx, '未知错误');
  }
  // 文章列表
  async list(ctx: Context) {
    console.log(ctx.request.query);
    const params = ctx.request.query;
    const list = await ArticleService.getArticleList(params);
    return response.seccess(ctx, list);
  }
  // 文章搜索
  async search(ctx: Context) {}
}

export default new ArticleController();

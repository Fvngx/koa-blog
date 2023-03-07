import Article, { IArticle, IParams } from '../model/Article';
import { Op } from 'sequelize';
import Category from '../model/Category';
import Tag from '../model/Tag';

class ArticleService {
  // 新建文章
  addArticle(article: IArticle) {
    return Article.create(article);
  }
  // 更新文章
  async updateArticle(id: number, article: IArticle) {
    return Article.update(article, { where: { id } });
  }
  // 删除文章
  delArticle(id: number) {
    return Article.destroy({ where: { id } });
  }
  // 获取文章详情
  async getArticleDetail(id: number) {
    const article: IArticle | null = await Article.findByPk(id);
    return article;
  }
  // 获取文章列表
  async getArticleList(params: IParams) {
    const { keyword, limit, offset, state, cId } = params;
    let articles: { rows: IArticle[]; count: number } | null;
    let data = {
      where: {},
      limit: 10,
      offset: 0,
      include: [Category, Tag],
      // order: [['id', 'DESC']],
    };
    const { or, like } = Op;
    if (keyword) {
      data.where = {
        [or]: [
          { title: { [like]: `%${keyword}%` } },
          { content: { [like]: `%${keyword}%` } },
        ],
      };
    }
    if (state !== null) {
      (data.where as any).state = Number(state);
    }
    if (cId) {
      (data.where as any).cId = Number(cId);
    }
    if (state) {
      (data.where as any).state = 1;
    } else {
      (data.where as any).state = 0;
    }
    data.limit = Number(limit);
    data.offset = Number(offset);

    articles = await Article.findAndCountAll(data);
    return { count: articles.count, list: articles.rows };
  }
}

export default new ArticleService();

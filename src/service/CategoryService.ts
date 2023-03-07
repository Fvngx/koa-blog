import Category, { ICategory } from '../model/Category';
import { Op } from 'sequelize';
import Article from '../model/Article';

class CategoryService {
  // 新建分类
  addCategory(category: ICategory) {
    return Category.create(category);
  }
  // 更新分类
  updateCategory(id: number, category: ICategory) {
    return Category.update(category, { where: { id } });
  }
  // 删除分类
  delCategory(id: number) {
    return Category.destroy({ where: { id } });
  }
  // 分类详情
  async detailCategory(id: number) {
    const category: ICategory | null = await Category.findByPk(id);
    return category;
  }
  // 分类列表
  async getCategoryList(params: {
    offset?: number;
    limit?: number;
    keyword?: string;
    addArt?: boolean;
  }) {
    const { offset, limit, keyword, addArt } = params;
    let categorys: { rows: ICategory[]; count: number } | null;

    const { or, like } = Op;
    let data = {
      where: {},
      include: {},
      limit: 10,
      offset: 0,
      // order: [['id', 'DESC']],
    };
    if (keyword) {
      data.where = {
        [or]: [
          { name: { [like]: `%${keyword}%` } },
          { desc: { [like]: `%${keyword}%` } },
        ],
      };
    }
    if (addArt) {
      data.include = [Article];
    } else {
      data.include = [];
    }
    if (limit !== null || limit !== undefined) {
      data.limit = Number(limit);
    }
    if (offset !== null || offset !== undefined) {
      data.offset = Number(offset);
    }
    categorys = await Category.findAndCountAll(data);
    return { count: categorys.count, list: categorys.rows };
  }
}

export default new CategoryService();

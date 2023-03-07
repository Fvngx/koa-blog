import Tag, { ITag } from '../model/Tag';
import { Op } from 'sequelize';
import Article from '../model/Article';

class TagService {
  // 新建标签
  addTag(tag: ITag) {
    return Tag.create(tag);
  }
  // 更新标签
  updateTag(id: number, tag: ITag) {
    return Tag.update(tag, { where: { id } });
  }
  // 删除标签
  delTag(id: number) {
    return Tag.destroy({ where: { id } });
  }
  // 分类详情
  async detailTag(id: number) {
    const tag: ITag | null = await Tag.findByPk(id);
    return tag;
  }
  // 标签列表
  async getTagList(params: {
    offset?: number;
    limit?: number;
    keyword?: string;
    addArt?: boolean;
  }) {
    const { offset, limit, keyword, addArt } = params;
    let tags: { rows: ITag[]; count: number } | null;

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

    tags = await Tag.findAndCountAll(data);
    return { count: tags.count, list: tags.rows };
  }
}

export default new TagService();

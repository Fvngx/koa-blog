import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  ForeignKey,
  AllowNull,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import ArticleTag from './ArticleTag';
import Category from './Category';
import Tag from './Tag';

export interface IArticle {
  id?: number;
  // 文章标题
  title?: string;
  // 文章封面
  cover?: string;
  // 文章内容
  content?: string;
  // 是否可评论
  commentAble?: boolean;
  // 文章分类id
  c_id?: number;
  // 文章分类
  category?: Category;
  // 文章标签id
  t_id?: string;
  // 文章标签
  tags?: Tag[];
  // 文章点赞数
  thumbs?: number;
  // 文章浏览量
  views?: number;
  state?: number;
  origin?: number;
  // 创建时间
  createdAt?: Date;
  // 更新时间
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IParams {
  keyword?: string;
  offset?: number;
  limit?: number;
  state?: number;
  cId?: number;
}

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'article', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，articles
  paranoid: true, // 软删除
})
class Article extends Model<IArticle> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;
  @Column
  title!: string;
  @Column
  cover!: string;
  @Column
  content!: string;
  @Column({ defaultValue: 0, comment: '点赞数' })
  thumbs!: number;
  @Column({ defaultValue: 0, comment: '浏览量' })
  views!: number;
  @Column({ defaultValue: 0, comment: '是否发布 0:草稿; 1:发布;' })
  state!: number;
  @Column({ defaultValue: 0, comment: '是否原创 0:原创; 1:转载; 2:混合;' })
  origin!: number;
  @ForeignKey(() => Category)
  @AllowNull
  @Column({ field: 'c_id' })
  c_id!: number;
  @BelongsTo(() => Category)
  category!: Category;
  @BelongsToMany(() => Tag, () => ArticleTag)
  tags!: Tag[];
}

export default Article;

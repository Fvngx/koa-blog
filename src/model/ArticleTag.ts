import {
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  Column,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';
import Article, { IArticle } from './Article';
import Tag, { ITag } from './Tag';

export interface IArticleTag {
  artId: number;
  tagId: number;
}

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'articletag', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，articles
  paranoid: true, // 软删除
})
class ArticleTag extends Model<IArticleTag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Article)
  @AllowNull
  @Column({ field: 'art_id' })
  artId!: number;

  @ForeignKey(() => Tag)
  @AllowNull
  @Column({ field: 'tag_id' })
  tagId!: number;
}

export default ArticleTag;

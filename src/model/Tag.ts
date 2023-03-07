import {
  AutoIncrement,
  Column,
  Model,
  Table,
  PrimaryKey,
  BelongsToMany,
} from 'sequelize-typescript';
import Article from './Article';
import ArticleTag from './ArticleTag';

export interface ITag {
  id?: number;
  name?: string;
  desc?: string;
  icon?: string;
  // 创建时间
  createdAt?: Date;
  // 更新时间
  updatedAt?: Date;
  deletedAt?: Date;
  articles: Article[];
}

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'tag', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，articles
  paranoid: true, // 软删除
})
class Tag extends Model<ITag> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
  @Column
  name!: string;
  @Column
  desc!: string;
  @Column
  icon!: string;
  @BelongsToMany(() => Article, () => ArticleTag)
  articles!: Article[];
}

export default Tag;

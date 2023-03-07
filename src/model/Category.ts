import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  HasMany,
} from 'sequelize-typescript';
import Article, { IArticle } from './Article';

export interface ICategory {
  id?: number;
  name?: string;
  desc?: string;
  icon?: string;
  articles?: IArticle[];
  // 创建时间
  createdAt?: Date;
  // 更新时间
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'category', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，articles
  paranoid: true, // 软删除
})
class Category extends Model<ICategory> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;
  @Column
  name!: string;
  @Column
  desc!: string;
  @Column
  icon!: string;
  @HasMany(() => Article, 'c_id')
  articles!: Article[];
}

export default Category;

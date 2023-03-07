import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface IAdmin {
  id?: number;
  name?: string;
  password?: string;
  avatar?: string;
  mobile?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({
  timestamps: true, // 自动维护时间
  tableName: 'admin', // 数据库表名称
  freezeTableName: true, // 禁止修改表名，如果不写会把表名自动复数化，articles
  paranoid: true, // 软删除
})
export default class Admin extends Model<IAdmin> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;
  @Column
  name!: string;
  @Column
  password!: string;
  @Column({ defaultValue: '', comment: '头像' })
  avatar!: string;
  @Column({ defaultValue: '', comment: '手机号' })
  mobile!: string;
  @Column({ defaultValue: '', comment: '邮箱' })
  email!: string;
}

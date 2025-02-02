import { Table, Model, Column, DataType } from "sequelize-typescript";
import { DriverEntity } from "../../../1-enterprise/entities/driver.entity";
import { UserEntity } from "../../../1-enterprise/entities/user.entity";
import { ActionSysParams } from "../../../1-enterprise/enum/sysParams";

@Table({
  timestamps: false,
  tableName: "SysParams",
})
export class SysParams extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  })
  id!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  driver!: Partial<DriverEntity>

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  user!: Partial<UserEntity>

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  action!: ActionSysParams;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  reason!: string;
}
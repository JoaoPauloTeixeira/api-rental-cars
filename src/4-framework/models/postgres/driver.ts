import { Table, Model, Column, DataType } from "sequelize-typescript";
import { Address } from "../../../1-enterprise/models/driver";

@Table({
  timestamps: false,
  tableName: "Driver",
})
export class Driver extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  document!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'birth_date'
  })
  birthDate!: Date;

  @Column({
    type: DataType.JSON,
    allowNull: false
  })
  address!: Address;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    onUpdate: 'CASCADE'
  })
  active!: boolean;
}
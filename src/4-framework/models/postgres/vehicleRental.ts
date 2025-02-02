import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "VehicleRental",
})
export class VehicleRental extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  driverId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  driverName!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  vehicleId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  vehicleBrand!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  reason!: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'start_date'
  })
  startDate!: Date

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'end_date'
  })
  endDate!: Date

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'return_date'
  })
  returnDate!: Date

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  active!: boolean;
}
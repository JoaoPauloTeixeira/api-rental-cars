import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { Driver } from "../models/postgres/driver";
import { SysParams } from "../models/postgres/sysParams";
import { Vehicle } from "../models/postgres/vehicle";
import { VehicleRental } from "../models/postgres/vehicleRental";

dotenv.config();

const connection = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [Driver, SysParams, Vehicle, VehicleRental],
});

export default connection;
import 'reflect-metadata'
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Container, { Service } from 'typedi';
import RestRouters from './4-framework/routes';
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
import connection from "./4-framework/infra/database";

const PORT = process.env.NODE_LOCAL_PORT;

@Service()
class ExpressServer {
  server: Application;

  constructor() {
    this.server = express();
  }

  getRouter() {
    return express.Router();
  }

  initializeMiddlewares() {
    dotenv.config();
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    const DB = process.env.POSTGRESDB_DATABASE 
    Container.set(Sequelize, DB)
    Container.getMany('models')
  }

  initializeRestRouters() {
    const restRouters = new RestRouters(this.server);
    restRouters.initialize();
  }

  async initialize() {
    this.initializeMiddlewares();
    this.initializeRestRouters();

    try {
      await connection.sync();
      this.server.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
      });
    } catch (error: any) {
      console.error(`Error occurred: ${error.message}`);
    }
  }
}

export default ExpressServer;
import { NextFunction, Request, Response } from "express";
import { CreateDriverValidationSchema } from "../validators/driver/create";
import { validateOrReject } from "class-validator";
import { UpdateDriverValidationSchema } from "../validators/driver/update";
import { InactivateDriverValidationSchema } from "../validators/driver/inactivate";
import { plainToClass } from "class-transformer";
import { Driver } from "../models/postgres/driver";

export const createDriverValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'Missing request body!' });
    }

    const driverData = new CreateDriverValidationSchema();
    driverData.name = req.body.name;
    driverData.document = req.body.document
    driverData.birthDate = req.body.birthDate
    driverData.address = req.body.address

    // checks a driver instance against the schema validations
    await validateOrReject(driverData);
    
    // calls the next operation
    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints);
    res.status(400).send({ message });
  }
};

export const updateDriverValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'Missing request body!' });
    }

    if (!req.params) {
      return res.status(400).send({ message: 'Missing request params!' });
    }

    const driverData = new UpdateDriverValidationSchema();
    driverData.name = req.body.name;
    driverData.address = req.body.address

    // checks a driver instance against the schema validations
    await validateOrReject(driverData);

    // calls the next operation
    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints);
    res.status(400).send({ message });
  }
};

export const inactivateDriverValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'Missing request body!' });
    }

    const data = new InactivateDriverValidationSchema();
    data.driver = req.body.driver;
    data.user = req.body.user
    data.action = req.body.action
    data.reason = req.body.reason

    // checks a driver instance against the schema validations
    await validateOrReject(data);

    req.body = plainToClass(Driver, data);
    // calls the next operation
    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints);
    res.status(400).send({ message });
  }
};

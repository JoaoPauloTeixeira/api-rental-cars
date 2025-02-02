import Container, { Service } from 'typedi';
import { NextFunction, Request, Response, Router } from 'express';
import ExpressServer from '../../../server';
import { CreateVehicleRentalController } from '../../../3-presentation/controller/vehicleRental/create.controller';
import { EndRentController } from '../../../3-presentation/controller/vehicleRental/endRent.controller';
import { GetVehicleRentalController } from '../../../3-presentation/controller/vehicleRental/get.controller';
import { GetVehicleRentalByIdController } from '../../../3-presentation/controller/vehicleRental/getById.controller';

@Service()
class VehicleRentalRoutes {
  router: Router;

  constructor(
    public createVehicleRentalController: CreateVehicleRentalController,
    public endRentController: EndRentController,
    public getVehicleRentalController: GetVehicleRentalController,
    public getVehicleRentalByIdController: GetVehicleRentalByIdController
  ) {
    this.router = Container.get(ExpressServer).getRouter();
  }

  initialize() {

    this.router.get('/:id', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getVehicleRentalByIdController.run(req.params.id));
      } catch (error) {
        res.status(error.httpCode ?? 500)
        return res.json(error)
      }
    });

    this.router.get('/', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getVehicleRentalController.run(req.query)); 
      } catch (error) {
        res.status(error.httpCode ?? 500)
        return res.json(error)
      }
    });

    this.router.post(
      '/',
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          res.status(200).json(await this.createVehicleRentalController.run(req.body));
        } catch (error) {
          res.status(error.httpCode ?? 500)
          return res.json(error)
        }
      },
    );

    this.router.post(
      '/ends',
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          res.status(200).json(await this.endRentController.run(req.body));
        } catch (error) {
          res.status(error.httpCode)
          return res.json(error)
        }
      },
    );

    return this.router;
  }
}

export default VehicleRentalRoutes;

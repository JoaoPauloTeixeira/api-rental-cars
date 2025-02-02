import Container, { Service } from 'typedi';
import { NextFunction, Request, Response, Router } from 'express';
import ExpressServer from '../../../server';
import { CreateVehicleController } from '../../../3-presentation/controller/vehicle/create.controller';
import { GetVehicleController } from '../../../3-presentation/controller/vehicle/get.controller';
import { GetVehicleByIdController } from '../../../3-presentation/controller/vehicle/getById.controller';
import { UpdateVehicleController } from '../../../3-presentation/controller/vehicle/update.controller';

@Service()
class VehicleRoutes {
  router: Router;

  constructor(
    public createVehicleController: CreateVehicleController,
    public getVehicleController: GetVehicleController,
    public getVehicleByIdController: GetVehicleByIdController,
    public updateVehicleController: UpdateVehicleController
  ) {
    this.router = Container.get(ExpressServer).getRouter();
  }

  initialize() {
    this.router.get('/', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getVehicleController.run(req.query));
      } catch (error) {
        res.status(error.code ?? error.httpCode ?? 500)
        return res.json(error)
      }
    });

    this.router.get('/:id', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getVehicleByIdController.run(req.params.id));
      } catch (error) {
        res.status(error.httpCode ?? 500)
        return res.json(error)
      }
    });

    this.router.post(
      '/',
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          res.status(200).json(await this.createVehicleController.run(req.body));
        } catch (error) {
          res.status(error.httpCode ?? 500)
          return res.json(error)
        }
      },
    );

    this.router.patch(
      '/:id',
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          const { id } = req.params
          res.status(200).json(await this.updateVehicleController.run({ ...req.body, id }));
        } catch (error) {
          res.status(error.httpCode ?? 500)
          return res.json(error)
        }
      },
    );

    return this.router;
  }
}

export default VehicleRoutes;

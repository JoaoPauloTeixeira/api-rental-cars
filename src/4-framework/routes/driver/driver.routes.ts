import Container, { Service } from 'typedi';
import { NextFunction, Request, Response, Router } from 'express';
import ExpressServer from '../../../server';
import { GetDriverController } from '../../../3-presentation/controller/driver/get.controller';
import { CreateDriverController } from '../../../3-presentation/controller/driver/create.controller';
import { createDriverValidator, inactivateDriverValidator, updateDriverValidator } from '../../middlewares/driver.validator.middleware';
import { GetDriverByIdController } from '../../../3-presentation/controller/driver/getById.controller';
import { UpdateDriverController } from '../../../3-presentation/controller/driver/update.controller';
import { Output } from '../../../2-business/dto/output';
import { InactivateDriverController } from '../../../3-presentation/controller/driver/inactivate.controller';

@Service()
class DriverRoutes {
  router: Router;

  constructor(
    public getDriverController: GetDriverController,
    public getDriverByIdController: GetDriverByIdController,
    public createDriverController: CreateDriverController,
    public updateDriverController: UpdateDriverController,
    public inactivateDriverController: InactivateDriverController
  ) {
    this.router = Container.get(ExpressServer).getRouter();
  }

  initialize() {
    this.router.get('/', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getDriverController.run(req.query));
      } catch (error) {
          res.status(error.code ?? error.httpCode ?? 500)
          return res.json(error)        
      }
    });

    this.router.get('/:id', async (req: Request, res: Response): Promise<any> => {
      try {
        res.status(200).json(await this.getDriverByIdController.run(req.params.id));
      } catch (error) {
          res.status(error.code ?? error.httpCode ?? 500)
          return res.json(error)        
      }
    });

    this.router.post(
      '/',
      createDriverValidator as any,
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          res.status(200).json(await this.createDriverController.run(req.body));
        } catch (error) {
          res.status(error.code ?? error.httpCode ?? 500)
          return res.json(error)          
        }
      },
    );

    this.router.patch(
      '/:id',
      updateDriverValidator as any,
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { id } = req.params
        try {
          res.status(200).json(await this.updateDriverController.run({ ...req.body, id }));
        } catch (error) {
          res.status(error.code ?? error.httpCode ?? 500)
          return res.json(error)          
        }
      },
    );

    this.router.post(
      '/inactivate',
      inactivateDriverValidator as any,
      async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
          res.status(200).json(await this.inactivateDriverController.run(req.body));
        } catch (error) {
          res.status(error.code ?? error.httpCode ?? 500)
          return res.json(error)          
        }
      },
    );

    return this.router;
  }
}

export default DriverRoutes;

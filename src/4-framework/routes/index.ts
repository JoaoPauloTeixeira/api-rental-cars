import { Application } from 'express';
import Container, { Service } from 'typedi';

import DriverRoutes from './driver/driver.routes';
import VehicleRoutes from './vehicle/vehicle.routes';
import VehicleRentalRoutes from './vehicleRental/vehicleRental.routes';

@Service()
class RestRouters {
  server: Application;
  driverRoutes: DriverRoutes;
  vehicleRoutes: VehicleRoutes;
  vehicleRentalRoutes: VehicleRentalRoutes;

  constructor(server: Application) {
    this.server = server;
    this.driverRoutes = Container.get(DriverRoutes);
    this.vehicleRoutes = Container.get(VehicleRoutes);
    this.vehicleRentalRoutes = Container.get(VehicleRentalRoutes);
  }

  initialize() {
    this.server.use('/driver', this.driverRoutes.initialize());
    this.server.use('/vehicle', this.vehicleRoutes.initialize());
    this.server.use('/rental', this.vehicleRentalRoutes.initialize());
  }
}

export default RestRouters;
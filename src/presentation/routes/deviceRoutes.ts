import { Router } from 'express';
import { DeviceController } from '../controllers/DeviceController.js';

export function createDeviceRoutes(deviceController: DeviceController): Router {
  const router = Router();

  router.get('/on', (req, res) => deviceController.turnOn(req, res));
  router.get('/off', (req, res) => deviceController.turnOff(req, res));

  return router;
}

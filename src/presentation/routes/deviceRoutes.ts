import { Router } from 'express';
import { DeviceController } from '../controllers/DeviceController.js';

export function createDeviceRoutes(deviceController: DeviceController): Router {
  const router = Router();

  // Rutas para compatibilidad hacia atrás
  router.get('/on', (req, res) => deviceController.turnOn(req, res));
  router.get('/off', (req, res) => deviceController.turnOff(req, res));

  // Rutas específicas para cada relé
  router.get('/rele1/on', (req, res) => deviceController.controlRele1On(req, res));
  router.get('/rele1/off', (req, res) => deviceController.controlRele1Off(req, res));
  
  router.get('/rele2/on', (req, res) => deviceController.controlRele2On(req, res));
  router.get('/rele2/off', (req, res) => deviceController.controlRele2Off(req, res));
  
  router.get('/rele3/on', (req, res) => deviceController.controlRele3On(req, res));
  router.get('/rele3/off', (req, res) => deviceController.controlRele3Off(req, res));
  
  router.get('/rele4/on', (req, res) => deviceController.controlRele4On(req, res));
  router.get('/rele4/off', (req, res) => deviceController.controlRele4Off(req, res));

  // Ruta para obtener el estado de todos los dispositivos
  router.get('/status', (req, res) => deviceController.getDevicesStatus(req, res));

  return router;
}

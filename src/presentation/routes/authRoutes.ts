import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/login', (req, res) => authController.login(req, res));

  return router;
}

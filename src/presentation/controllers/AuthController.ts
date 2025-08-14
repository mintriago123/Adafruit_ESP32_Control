import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/usecases/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../application/usecases/LoginUserUseCase.js';

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const result = await this.registerUserUseCase.execute({ username, password });
      
      if (result.success) {
        res.status(201).json({ status: result.message });
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const result = await this.loginUserUseCase.execute({ username, password });
      
      if (result.success) {
        res.status(200).json({ status: result.message });
      } else {
        res.status(401).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

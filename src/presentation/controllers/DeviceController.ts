import { Request, Response } from 'express';
import { ControlDeviceUseCase } from '../../application/usecases/ControlDeviceUseCase.js';

export class DeviceController {
  constructor(private controlDeviceUseCase: ControlDeviceUseCase) {}

  async turnOn(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.controlDeviceUseCase.execute({
        deviceId: 'rele1',
        action: 'ON'
      });
      
      if (result.success) {
        res.status(200).json({ status: result.message });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async turnOff(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.controlDeviceUseCase.execute({
        deviceId: 'rele1',
        action: 'OFF'
      });
      
      if (result.success) {
        res.status(200).json({ status: result.message });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

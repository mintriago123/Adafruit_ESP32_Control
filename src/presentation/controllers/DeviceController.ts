import { Request, Response } from 'express';
import { ControlDeviceUseCase } from '../../application/usecases/ControlDeviceUseCase.js';

export class DeviceController {
  constructor(private controlDeviceUseCase: ControlDeviceUseCase) {}

  async controlRele1On(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele1', 'ON', res);
  }

  async controlRele1Off(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele1', 'OFF', res);
  }

  async controlRele2On(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele2', 'ON', res);
  }

  async controlRele2Off(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele2', 'OFF', res);
  }

  async controlRele3On(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele3', 'ON', res);
  }

  async controlRele3Off(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele3', 'OFF', res);
  }

  async controlRele4On(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele4', 'ON', res);
  }

  async controlRele4Off(req: Request, res: Response): Promise<void> {
    await this.controlDevice('rele4', 'OFF', res);
  }

  async getDevicesStatus(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.controlDeviceUseCase.getDevicesStatus();
      
      if (result.success) {
        res.status(200).json({ status: result.message, data: result.data });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  private async controlDevice(deviceId: string, action: 'ON' | 'OFF', res: Response): Promise<void> {
    try {
      const result = await this.controlDeviceUseCase.execute({ deviceId, action });
      
      if (result.success) {
        res.status(200).json({ status: result.message });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Métodos de compatibilidad hacia atrás
  async turnOn(req: Request, res: Response): Promise<void> {
    await this.controlRele1On(req, res);
  }

  async turnOff(req: Request, res: Response): Promise<void> {
    await this.controlRele1Off(req, res);
  }
}

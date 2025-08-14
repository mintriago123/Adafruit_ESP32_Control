import { DeviceRepository } from '../../domain/repositories/DeviceRepository.js';
import { DeviceControlRequest } from '../../domain/entities/Device.js';

export class ControlDeviceUseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(request: DeviceControlRequest): Promise<{ success: boolean; message: string }> {
    try {
      await this.deviceRepository.sendCommand(request);
      return { success: true, message: `${request.action} enviado a Adafruit IO` };
    } catch (error) {
      return { success: false, message: 'Error al enviar comando al dispositivo' };
    }
  }
}

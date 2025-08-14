import { DeviceRepository } from '../../domain/repositories/DeviceRepository.js';
import { DeviceControlRequest, MultipleDevicesStatus } from '../../domain/entities/Device.js';

export class ControlDeviceUseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute(request: DeviceControlRequest): Promise<{ success: boolean; message: string }> {
    try {
      await this.deviceRepository.sendCommand(request);
      return { success: true, message: `${request.action} enviado a ${request.deviceId}` };
    } catch (error) {
      console.error('Error en ControlDeviceUseCase:', error);
      return { success: false, message: `Error al enviar comando a ${request.deviceId}` };
    }
  }

  async getDevicesStatus(): Promise<{ success: boolean; data?: MultipleDevicesStatus; message: string }> {
    try {
      const status = await this.deviceRepository.getAllDevicesStatus();
      return { success: true, data: status, message: 'Estado obtenido correctamente' };
    } catch (error) {
      console.error('Error obteniendo estado de dispositivos:', error);
      return { success: false, message: 'Error al obtener estado de dispositivos' };
    }
  }
}

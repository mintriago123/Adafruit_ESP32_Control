import { DeviceControlRequest } from '../entities/Device.js';

export interface DeviceRepository {
  sendCommand(request: DeviceControlRequest): Promise<void>;
}

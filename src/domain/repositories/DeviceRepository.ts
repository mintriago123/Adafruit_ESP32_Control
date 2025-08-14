import { DeviceControlRequest, MultipleDevicesStatus } from '../entities/Device.js';

export interface DeviceRepository {
  sendCommand(request: DeviceControlRequest): Promise<void>;
  getAllDevicesStatus(): Promise<MultipleDevicesStatus>;
}

export interface Device {
  id: string;
  name: string;
  status: 'ON' | 'OFF';
}

export interface DeviceControlRequest {
  deviceId: string;
  action: 'ON' | 'OFF';
}

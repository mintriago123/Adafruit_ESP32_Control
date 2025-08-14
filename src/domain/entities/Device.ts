export interface Device {
  id: string;
  name: string;
  status: 'ON' | 'OFF';
  pin?: number;
}

export interface DeviceControlRequest {
  deviceId: string;
  action: 'ON' | 'OFF';
}

export interface MultipleDevicesStatus {
  rele1: 'ON' | 'OFF';
  rele2: 'ON' | 'OFF';
  rele3: 'ON' | 'OFF';
  rele4: 'ON' | 'OFF';
}

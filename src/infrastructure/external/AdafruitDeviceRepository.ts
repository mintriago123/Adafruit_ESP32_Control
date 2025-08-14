import fetch from 'node-fetch';
import { DeviceRepository } from '../../domain/repositories/DeviceRepository.js';
import { DeviceControlRequest, MultipleDevicesStatus } from '../../domain/entities/Device.js';

export class AdafruitDeviceRepository implements DeviceRepository {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly username: string;
  private readonly feeds: { [key: string]: string };

  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;
    this.baseUrl = `https://io.adafruit.com/api/v2/${username}/feeds`;
    this.feeds = {
      rele1: 'rele1',
      rele2: 'rele2', 
      rele3: 'rele3',
      rele4: 'rele4'
    };
  }

  async sendCommand(request: DeviceControlRequest): Promise<void> {
    const feedName = this.feeds[request.deviceId];
    if (!feedName) {
      throw new Error(`Feed no encontrado para dispositivo: ${request.deviceId}`);
    }

    const url = `${this.baseUrl}/${feedName}/data`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-AIO-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: request.action }),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar comando a ${request.deviceId}: ${response.statusText}`);
    }
  }

  async getAllDevicesStatus(): Promise<MultipleDevicesStatus> {
    const status: MultipleDevicesStatus = {
      rele1: 'OFF',
      rele2: 'OFF', 
      rele3: 'OFF',
      rele4: 'OFF'
    };

    try {
      // Obtener el último valor de cada feed
      for (const [deviceId, feedName] of Object.entries(this.feeds)) {
        const url = `${this.baseUrl}/${feedName}/data/last`;
        const response = await fetch(url, {
          headers: {
            'X-AIO-Key': this.apiKey,
          },
        });

        if (response.ok) {
          const data: any = await response.json();
          status[deviceId as keyof MultipleDevicesStatus] = data.value === 'ON' ? 'ON' : 'OFF';
        }
      }
    } catch (error) {
      console.error('Error obteniendo estado de dispositivos:', error);
    }

    return status;
  }
}

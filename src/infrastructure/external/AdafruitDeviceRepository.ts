import fetch from 'node-fetch';
import { DeviceRepository } from '../../domain/repositories/DeviceRepository.js';
import { DeviceControlRequest } from '../../domain/entities/Device.js';

export class AdafruitDeviceRepository implements DeviceRepository {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly username: string;

  constructor(username: string, apiKey: string, feedName: string) {
    this.username = username;
    this.apiKey = apiKey;
    this.baseUrl = `https://io.adafruit.com/api/v2/${username}/feeds/${feedName}/data`;
  }

  async sendCommand(request: DeviceControlRequest): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'X-AIO-Key': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: request.action }),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar comando: ${response.statusText}`);
    }
  }
}

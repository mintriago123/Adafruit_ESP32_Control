import express from 'express';
import bodyParser from 'body-parser';
import { config } from './shared/config/config.js';
import { DatabaseConnection } from './infrastructure/database/DatabaseConnection.js';
import { SQLiteUserRepository } from './infrastructure/database/SQLiteUserRepository.js';
import { AdafruitDeviceRepository } from './infrastructure/external/AdafruitDeviceRepository.js';
import { RegisterUserUseCase } from './application/usecases/RegisterUserUseCase.js';
import { LoginUserUseCase } from './application/usecases/LoginUserUseCase.js';
import { ControlDeviceUseCase } from './application/usecases/ControlDeviceUseCase.js';
import { AuthController } from './presentation/controllers/AuthController.js';
import { DeviceController } from './presentation/controllers/DeviceController.js';
import { createAuthRoutes } from './presentation/routes/authRoutes.js';
import { createDeviceRoutes } from './presentation/routes/deviceRoutes.js';
import { typeScriptMiddleware } from './shared/middleware/typeScriptMiddleware.js';

class App {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(config.port);
    this.initializeMiddlewares();
    this.initializeDependencies();
  }

  private initializeMiddlewares(): void {
    // Configurar bodyParser para JSON
    this.app.use(bodyParser.json());

    // Middleware para transpilar TypeScript en tiempo real
    this.app.use(typeScriptMiddleware);

    // Servir archivos estáticos desde la carpeta public
    this.app.use(express.static('public'));

    // Middleware para CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  private initializeDependencies(): void {
    // Database
    const db = DatabaseConnection.getInstance();

    // Repositories
    const userRepository = new SQLiteUserRepository(db);
    const deviceRepository = new AdafruitDeviceRepository(
      config.adafruit.username,
      config.adafruit.apiKey
    );

    // Use Cases
    const registerUserUseCase = new RegisterUserUseCase(userRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const controlDeviceUseCase = new ControlDeviceUseCase(deviceRepository);

    // Controllers
    const authController = new AuthController(registerUserUseCase, loginUserUseCase);
    const deviceController = new DeviceController(controlDeviceUseCase);

    // Routes
    this.app.use('/auth', createAuthRoutes(authController));
    this.app.use('/device', createDeviceRoutes(deviceController));
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

const app = new App();
app.listen();

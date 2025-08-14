# ESP32 Control Application - Clean Architecture

Esta aplicación ha sido reestructurada siguiendo los principios de Clean Architecture para un mejor mantenimiento, testeo y escalabilidad.

## Estructura del Proyecto

```
esp/
├── src/                                    # Backend con Clean Architecture
│   ├── domain/                            # Capa de Dominio
│   │   ├── entities/                      # Entidades del negocio
│   │   │   ├── User.ts
│   │   │   └── Device.ts
│   │   └── repositories/                  # Interfaces de repositorios
│   │       ├── UserRepository.ts
│   │       └── DeviceRepository.ts
│   ├── application/                       # Capa de Aplicación
│   │   └── usecases/                      # Casos de uso del negocio
│   │       ├── RegisterUserUseCase.ts
│   │       ├── LoginUserUseCase.ts
│   │       └── ControlDeviceUseCase.ts
│   ├── infrastructure/                    # Capa de Infraestructura
│   │   ├── database/                      # Implementaciones de BD
│   │   │   ├── DatabaseConnection.ts
│   │   │   └── SQLiteUserRepository.ts
│   │   └── external/                      # Servicios externos
│   │       └── AdafruitDeviceRepository.ts
│   ├── presentation/                      # Capa de Presentación
│   │   ├── controllers/                   # Controladores HTTP
│   │   │   ├── AuthController.ts
│   │   │   └── DeviceController.ts
│   │   └── routes/                        # Definición de rutas
│   │       ├── authRoutes.ts
│   │       └── deviceRoutes.ts
│   ├── shared/                           # Elementos compartidos
│   │   └── config/                       # Configuración
│   │       └── config.ts
│   └── app.ts                            # Punto de entrada de la aplicación
├── frontend/                             # Frontend
│   ├── index.html
│   ├── main.ts
│   └── main.js
├── .env                                  # Variables de entorno
├── package.json
└── README.md
```

## Capas de Clean Architecture

### 1. Domain (Dominio)
- **Entities**: Modelos de datos del negocio (User, Device)
- **Repositories**: Interfaces que definen contratos para acceso a datos
- Esta capa no depende de ninguna otra capa

### 2. Application (Aplicación)
- **Use Cases**: Lógica de negocio específica de la aplicación
- Depende solo de la capa de dominio
- Implementa los casos de uso como RegisterUser, LoginUser, ControlDevice

### 3. Infrastructure (Infraestructura)
- **Database**: Implementaciones concretas de repositorios para bases de datos
- **External**: Servicios externos como Adafruit IO
- Implementa las interfaces definidas en la capa de dominio

### 4. Presentation (Presentación)
- **Controllers**: Manejo de peticiones HTTP
- **Routes**: Definición de endpoints de la API
- Punto de entrada para las peticiones del usuario

## API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario (solo uno permitido)
- `POST /auth/login` - Iniciar sesión

### Control de Dispositivos
- `GET /device/on` - Encender dispositivo
- `GET /device/off` - Apagar dispositivo

## Variables de Entorno

Crear un archivo `.env` con:
```
AIO_USERNAME=tu_usuario_adafruit
AIO_KEY=tu_key_adafruit
FEED_NAME=nombre_del_feed
PORT=3000
```

## Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar backend en desarrollo
npm run dev

# Ejecutar frontend
npm run serve:frontend

# Compilar frontend
npm run build:frontend
```

## Beneficios de Clean Architecture

1. **Separación de responsabilidades**: Cada capa tiene una responsabilidad específica
2. **Inversión de dependencias**: Las capas internas no dependen de las externas
3. **Facilidad de testing**: Cada capa puede ser testeada independientemente
4. **Mantenibilidad**: Cambios en una capa no afectan a las otras
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades

# ESP32 Control Application - Clean Architecture

Esta aplicación controla dispositivos ESP32 a través de Adafruit IO, implementada con Clean Architecture, autenticación de usuario único y ejecución directa de TypeScript.

## 🚀 Características

- **Clean Architecture**: Separación clara de responsabilidades en capas
- **Autenticación**: Sistema de login/registro con SQLite (solo un usuario)
- **Control IoT**: Envío de comandos ON/OFF a ESP32 vía Adafruit IO
- **TypeScript Directo**: Sin compilación, ejecución directa en el navegador
- **Variables de Entorno**: Configuración segura sin credenciales hardcodeadas
- **Interfaz Moderna**: Frontend responsive con diseño limpio

## 📁 Estructura del Proyecto

```
esp/
├── src/                                    # Backend con Clean Architecture
│   ├── domain/                            # Capa de Dominio
│   │   ├── entities/                      # Entidades del negocio
│   │   │   ├── User.ts                   # Modelo de usuario
│   │   │   └── Device.ts                 # Modelo de dispositivo
│   │   └── repositories/                  # Interfaces de repositorios
│   │       ├── UserRepository.ts         # Contrato para usuarios
│   │       └── DeviceRepository.ts       # Contrato para dispositivos
│   ├── application/                       # Capa de Aplicación
│   │   └── usecases/                      # Casos de uso del negocio
│   │       ├── RegisterUserUseCase.ts    # Registro de usuario
│   │       ├── LoginUserUseCase.ts       # Autenticación
│   │       └── ControlDeviceUseCase.ts   # Control de dispositivos
│   ├── infrastructure/                    # Capa de Infraestructura
│   │   ├── database/                      # Implementaciones de BD
│   │   │   ├── DatabaseConnection.ts     # Conexión SQLite
│   │   │   └── SQLiteUserRepository.ts   # Repositorio de usuarios
│   │   └── external/                      # Servicios externos
│   │       └── AdafruitDeviceRepository.ts # Cliente Adafruit IO
│   ├── presentation/                      # Capa de Presentación
│   │   ├── controllers/                   # Controladores HTTP
│   │   │   ├── AuthController.ts         # Controlador de auth
│   │   │   └── DeviceController.ts       # Controlador de dispositivos
│   │   └── routes/                        # Definición de rutas
│   │       ├── authRoutes.ts             # Rutas de autenticación
│   │       └── deviceRoutes.ts           # Rutas de dispositivos
│   ├── shared/                           # Elementos compartidos
│   │   ├── config/                       # Configuración
│   │   │   └── config.ts                 # Variables de entorno
│   │   └── middleware/                   # Middlewares
│   │       └── typeScriptMiddleware.ts   # Transpilación TS en tiempo real
│   └── app.ts                            # Punto de entrada
├── public/                               # Frontend
│   ├── index.html                        # Interfaz principal
│   ├── main.ts                          # Lógica del frontend (TypeScript)
│   └── favicon.svg                      # Icono de la app
├── .env                                  # Variables de entorno (no en repo)
├── .gitignore                           # Archivos ignorados por Git
├── users.db                             # Base de datos SQLite (no en repo)
├── package.json                         # Dependencias y scripts
├── tsconfig.json                        # Configuración TypeScript
└── README.md                            # Documentación
```

## 🏗️ Arquitectura

### Clean Architecture - Capas:

1. **Domain (Dominio)** - Lógica de negocio pura
2. **Application (Aplicación)** - Casos de uso específicos
3. **Infrastructure (Infraestructura)** - Implementaciones técnicas
4. **Presentation (Presentación)** - Interfaz HTTP y controladores

### Inversión de Dependencias:
- Las capas internas no conocen las externas
- Interfaces definen contratos
- Inyección de dependencias manual

## 🌐 API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario único
- `POST /auth/login` - Iniciar sesión

### Control de Dispositivos
- `GET /device/on` - Encender dispositivo ESP32
- `GET /device/off` - Apagar dispositivo ESP32

## ⚙️ Configuración

### Variables de Entorno
Crear archivo `.env` en la raíz:

```env
AIO_USERNAME=tu_usuario_adafruit
AIO_KEY=tu_clave_adafruit_io
FEED_NAME=nombre_del_feed
PORT=3000
```

### Hardware ESP32
1. Configurar ESP32 con WiFi
2. Conectar a Adafruit IO
3. Suscribir al feed configurado
4. Implementar lógica ON/OFF en el dispositivo

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/mintriago123/Adafruit_ESP32_Control.git
cd Adafruit_ESP32_Control

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Adafruit IO

# Ejecutar aplicación
npm run dev
```

### Acceso
1. Abrir `http://localhost:3000`
2. Registrar primer usuario (solo uno permitido)
3. Iniciar sesión
4. Controlar dispositivo ESP32

## 🛠️ Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Ejecutar en desarrollo
npm start        # Ejecutar en producción
```

### Características Técnicas
- **TypeScript**: Ejecución directa sin compilación (esbuild)
- **Base de datos**: SQLite con patrón repositorio
- **Autenticación**: Session-based con localStorage
- **CORS**: Configurado para desarrollo
- **Hot Reload**: Cambios en tiempo real

## 🔒 Seguridad

- ✅ Variables de entorno para credenciales
- ✅ Validación de entrada en frontend y backend
- ✅ Hashing de contraseñas con bcrypt
- ✅ Registro limitado a un solo usuario
- ✅ Base de datos excluida del repositorio

## 📝 Licencia

ISC License - Ver archivo LICENSE para detalles.

## 🤝 Contribución

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

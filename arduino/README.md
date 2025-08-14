# Código ESP32 para Control de 4 Relés

Este archivo contiene el código Arduino para el ESP32 que trabaja junto con la aplicación web de control de relés.

## 📋 Características

- **Control de 4 relés** independientes via Adafruit IO
- **Conectividad WiFi** con reconexión automática
- **Protocolo MQTT** para comunicación en tiempo real
- **Pines configurables** para diferentes conexiones de hardware
- **Monitor serie** con información detallada de estado

## 🔧 Configuración de Hardware

### Pines utilizados:
- **GPIO 7**: Relé 1
- **GPIO 8**: Relé 2
- **GPIO 9**: Relé 3  
- **GPIO 10**: Relé 4

### Conexiones recomendadas:
```
ESP32          Transistor C945        Relé
GPIO 7  -----> Base               
             Colector --------> VCC Relé 1
             Emisor   --------> GND
             
GPIO 8  -----> Base (Relé 2)
GPIO 9  -----> Base (Relé 3)  
GPIO 10 -----> Base (Relé 4)
```

## ⚙️ Configuración del Software

### 1. Instalar librerías necesarias:
```cpp
#include <WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>
```

### 2. Configurar WiFi:
```cpp
const char* ssid = "TU_RED_WIFI";      
const char* password = "TU_PASSWORD";  
```

### 3. Configurar Adafruit IO:
```cpp
#define AIO_USERNAME    "tu_usuario"
#define AIO_KEY         "tu_clave_aio"
```

## 🚀 Instalación

1. **Preparar Arduino IDE:**
   - Instalar soporte para ESP32
   - Instalar librería "Adafruit MQTT Library"
   - Instalar librería "WiFi"

2. **Configurar el código:**
   - Abrir `esp32_4_reles.ino`
   - Modificar credenciales WiFi
   - Verificar credenciales de Adafruit IO
   - Ajustar pines si es necesario

3. **Cargar el código:**
   - Conectar ESP32 via USB
   - Seleccionar board "ESP32 Dev Module"
   - Seleccionar puerto COM correcto
   - Cargar el sketch

## 📊 Feeds de Adafruit IO

El código se suscribe a estos feeds:
- `rele1` - Control del relé 1
- `rele2` - Control del relé 2  
- `rele3` - Control del relé 3
- `rele4` - Control del relé 4

### Comandos aceptados:
- `"ON"` - Activar relé (GPIO HIGH)
- `"OFF"` - Desactivar relé (GPIO LOW)

## 🔍 Monitor Serie

El código proporciona información detallada via monitor serie:

```
=== Control de 4 Relés ESP32 ===
Iniciando sistema...
Relés inicializados en estado OFF
Conectando a WiFi: TU_RED_WIFI....
¡Conectado a WiFi!
Dirección IP: 192.168.1.100
Señal WiFi: -45 dBm
Suscrito a feeds de Adafruit IO:
- usuario/feeds/rele1
- usuario/feeds/rele2
- usuario/feeds/rele3
- usuario/feeds/rele4
=== Estado actual de relés ===
Relé 1 (GPIO 7): OFF
Relé 2 (GPIO 8): OFF  
Relé 3 (GPIO 9): OFF
Relé 4 (GPIO 10): OFF
=============================
Sistema listo para recibir comandos...
```

## 🛠️ Funcionalidades

### Auto-reconexión:
- **WiFi**: Reconecta automáticamente si se pierde la conexión
- **MQTT**: Mantiene ping periódico y reconecta si es necesario

### Monitoreo:
- Estado de cada relé en tiempo real
- Información de conectividad WiFi
- Comandos recibidos con timestamp

### Robustez:
- Inicialización segura de todos los relés en OFF
- Manejo de errores de conexión
- Timeouts y reintentos automáticos

## 🔧 Personalización

### Cambiar pines:
```cpp
const int rele1 = 7;   // Cambiar por el pin deseado
const int rele2 = 8;   // Cambiar por el pin deseado
const int rele3 = 9;   // Cambiar por el pin deseado
const int rele4 = 10;  // Cambiar por el pin deseado
```

### Agregar más relés:
1. Definir nuevo pin
2. Crear nuevo feed
3. Agregar suscripción
4. Agregar lógica en el loop

## 🚨 Consideraciones de Seguridad

- ⚠️ **Voltaje**: Los relés pueden manejar altos voltajes - usar con precaución
- ⚠️ **Aislamiento**: Usar optoacopladores para mejor aislamiento
- ⚠️ **Protección**: Agregar fusibles y protecciones adecuadas
- ⚠️ **Credenciales**: No compartir claves de Adafruit IO

## 🐛 Solución de Problemas

### ESP32 no conecta a WiFi:
- Verificar SSID y contraseña
- Comprobar señal WiFi
- Revisar configuración del router

### No recibe comandos MQTT:
- Verificar credenciales Adafruit IO
- Comprobar nombres de feeds
- Revisar conexión a internet

### Relés no responden:
- Verificar conexiones de hardware
- Comprobar voltaje de alimentación
- Revisar configuración de pines

## 📞 Compatibilidad

Este código es compatible con:
- **ESP32 Dev Module**
- **ESP32-WROOM-32**
- **ESP32-S2**
- **ESP32-S3**

Tested con Arduino IDE 2.x y ESP32 Core 2.x

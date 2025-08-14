/*
 * Control de 4 Relés ESP32 con Adafruit IO
 * Compatible con la aplicación web desarrollada
 * 
 * Pines utilizados:
 * - GPIO 7: Relé 1
 * - GPIO 8: Relé 2  
 * - GPIO 9: Relé 3
 * - GPIO 10: Relé 4
 */

#include <WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>

// ==== Configuración WiFi ====
const char* ssid = "TU_RED_WIFI";        // Cambia por tu red WiFi
const char* password = "TU_PASSWORD";    // Cambia por tu contraseña WiFi

// ==== Pines para relés (activación por transistor C945) ====
const int rele1 = 7;   // GPIO7
const int rele2 = 8;   // GPIO8
const int rele3 = 9;   // GPIO9
const int rele4 = 10;  // GPIO10

// ==== Configuración Adafruit IO ====
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "tu_usuario"                    // Tu usuario de Adafruit IO
#define AIO_KEY         "tu_clave" // Tu clave de Adafruit IO

// ==== Nombres de los feeds ====
#define FEED1 "rele1"
#define FEED2 "rele2"
#define FEED3 "rele3"
#define FEED4 "rele4"

// ==== Cliente MQTT ====
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// ==== Suscripciones a los feeds ====
Adafruit_MQTT_Subscribe feedRele1 = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/" FEED1);
Adafruit_MQTT_Subscribe feedRele2 = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/" FEED2);
Adafruit_MQTT_Subscribe feedRele3 = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/" FEED3);
Adafruit_MQTT_Subscribe feedRele4 = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/" FEED4);

// ==== Función para conectar a MQTT ====
void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("Conectando a MQTT... ");
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Reintentando conexión MQTT en 5 segundos...");
    mqtt.disconnect();
    delay(5000);
  }
  Serial.println("¡Conectado a MQTT!");
}

// ==== Función para mostrar estado de los relés ====
void mostrarEstadoReles() {
  Serial.println("=== Estado actual de relés ===");
  Serial.printf("Relé 1 (GPIO %d): %s\n", rele1, digitalRead(rele1) ? "ON" : "OFF");
  Serial.printf("Relé 2 (GPIO %d): %s\n", rele2, digitalRead(rele2) ? "ON" : "OFF");
  Serial.printf("Relé 3 (GPIO %d): %s\n", rele3, digitalRead(rele3) ? "ON" : "OFF");
  Serial.printf("Relé 4 (GPIO %d): %s\n", rele4, digitalRead(rele4) ? "ON" : "OFF");
  Serial.println("=============================");
}

void setup() {
  // Inicializar comunicación serie
  Serial.begin(115200);
  Serial.println("=== Control de 4 Relés ESP32 ===");
  Serial.println("Iniciando sistema...");

  // Configurar pines de los relés como salidas
  pinMode(rele1, OUTPUT);
  pinMode(rele2, OUTPUT);
  pinMode(rele3, OUTPUT);
  pinMode(rele4, OUTPUT);

  // Inicializar todos los relés en estado OFF (LOW)
  digitalWrite(rele1, LOW);
  digitalWrite(rele2, LOW);
  digitalWrite(rele3, LOW);
  digitalWrite(rele4, LOW);
  
  Serial.println("Relés inicializados en estado OFF");

  // Conectar a WiFi
  WiFi.begin(ssid, password);
  Serial.printf("Conectando a WiFi: %s", ssid);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.println("¡Conectado a WiFi!");
  Serial.printf("Dirección IP: %s\n", WiFi.localIP().toString().c_str());
  Serial.printf("Señal WiFi: %d dBm\n", WiFi.RSSI());

  // Suscribirse a los feeds de Adafruit IO
  mqtt.subscribe(&feedRele1);
  mqtt.subscribe(&feedRele2);
  mqtt.subscribe(&feedRele3);
  mqtt.subscribe(&feedRele4);
  
  Serial.println("Suscrito a feeds de Adafruit IO:");
  Serial.printf("- %s/feeds/%s\n", AIO_USERNAME, FEED1);
  Serial.printf("- %s/feeds/%s\n", AIO_USERNAME, FEED2);
  Serial.printf("- %s/feeds/%s\n", AIO_USERNAME, FEED3);
  Serial.printf("- %s/feeds/%s\n", AIO_USERNAME, FEED4);
  
  mostrarEstadoReles();
  Serial.println("Sistema listo para recibir comandos...");
}

void loop() {
  // Mantener conexión MQTT
  MQTT_connect();

  // Leer mensajes de los feeds
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(100))) {
    String valor = (char *)subscription->lastread;
    String feed = String(subscription->topic);
    
    // Extraer nombre del feed
    int feedStart = feed.lastIndexOf('/') + 1;
    String feedName = feed.substring(feedStart);
    
    Serial.printf("📨 Comando recibido - Feed: %s, Valor: %s\n", feedName.c_str(), valor.c_str());

    // Procesar comando para cada relé
    if (subscription == &feedRele1) {
      digitalWrite(rele1, (valor == "ON") ? HIGH : LOW);
      Serial.printf("🔌 Relé 1 (GPIO %d): %s\n", rele1, (valor == "ON") ? "ENCENDIDO" : "APAGADO");
    }
    else if (subscription == &feedRele2) {
      digitalWrite(rele2, (valor == "ON") ? HIGH : LOW);
      Serial.printf("🔌 Relé 2 (GPIO %d): %s\n", rele2, (valor == "ON") ? "ENCENDIDO" : "APAGADO");
    }
    else if (subscription == &feedRele3) {
      digitalWrite(rele3, (valor == "ON") ? HIGH : LOW);
      Serial.printf("🔌 Relé 3 (GPIO %d): %s\n", rele3, (valor == "ON") ? "ENCENDIDO" : "APAGADO");
    }
    else if (subscription == &feedRele4) {
      digitalWrite(rele4, (valor == "ON") ? HIGH : LOW);
      Serial.printf("🔌 Relé 4 (GPIO %d): %s\n", rele4, (valor == "ON") ? "ENCENDIDO" : "APAGADO");
    }
  }

  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("⚠️  Conexión WiFi perdida. Reconectando...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("\n✅ WiFi reconectado");
  }

  // Ping periódico para mantener conexión MQTT
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
  
  delay(100); // Pequeña pausa para no saturar el procesador
}

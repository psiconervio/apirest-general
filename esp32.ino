#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "P102";
const char* password = "12345678";
const char* serverName = "/api/data";

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a la red WiFi");
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverName);

    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"sensor\":\"temperatura\",\"value\":23.5}";

    int httpResponseCode = http.POST(jsonData);

    if(httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error en la conexión: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }

  delay(60000);  // Espera 60 segundos antes de enviar los datos nuevamente
}

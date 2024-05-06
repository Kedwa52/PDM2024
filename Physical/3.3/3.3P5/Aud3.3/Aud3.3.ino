const int ledPin = 13; // LED connected to digital pin 9
const int buttonPin= 2; 
int buttonState= 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600); // Initialize serial communication at 9600 baud rate
}

void loop() {
  // Read from serial and control LED
  if (Serial.available() > 0) {
    char value = Serial.read();
    if (value == '1') {
      digitalWrite(ledPin, HIGH); // Turn LED on
    } else if (value == '0') {
      digitalWrite(ledPin, LOW); // Turn LED off
    }
  }

  // Read button state and send it to serial
  buttonState = digitalRead(buttonPin);
  Serial.println(buttonState);
  delay(100); // Delay to stabilize readings
}

const int ledPin = 13; // LED connected to digital pin 9
const int analogPin= A0; 
int sensorValue= 0;
int outputValue =0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600); // Initialize serial communication at 9600 baud rate
}

void loop() {


 while (Serial.available() > 0) {
  if (Serial.read() == '1') {
  digitalWrite(ledPin, HIGH);} // Turn LED on
 else if (Serial.read() == '0'){
  digitalWrite(ledPin, LOW); // Turn LED off
    }
  }
  sensorValue= analogRead(analogPin);
  outputValue= map (sensorValue, 0, 1023, 0, 255);
  outputValue= constrain (outputValue, 0, 255);
  //analogWrite (analogPin, sensorValue);

  
  Serial.print (outputValue);
  Serial.print ("\n");

delay(100); // Delay to stabilize readings
}

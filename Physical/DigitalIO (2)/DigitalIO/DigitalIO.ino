
// Digital IO
/* Kristal Edwards 
   4/2/24
   csc 2463*/
const int buttonPin = 2;  // the number of the button 
const int ledPin = 13;    // the number of the LED 
const int buttonPin2 = 4;  // the number of the 2nd button 
const int ledPin2 = 12; // led 2

int buttonState = 0;  // variable for reading the pushbutton status
int buttonState2 = 0;

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
   pinMode(ledPin2, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  buttonState2 = digitalRead(buttonPin2);

  if (buttonState == HIGH) {
    //slower led
    digitalWrite(ledPin, HIGH);  // turn the LED on (HIGH is the voltage level)
    delay(500);                      // wait for a second
    digitalWrite(ledPin, LOW);   // turn the LED off by making the voltage LOW
    delay(500);
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
  //faster led blink
  if (buttonState2 == HIGH) {
    // turn LED on:
    digitalWrite(ledPin2, HIGH);  // turn the LED on (HIGH is the voltage level)
    delay(300);                      // wait for a second
    digitalWrite(ledPin2, LOW);   // turn the LED off by making the voltage LOW
    delay(250);
  } else {
    // turn LED off:
    digitalWrite(ledPin, LOW);
  }
}
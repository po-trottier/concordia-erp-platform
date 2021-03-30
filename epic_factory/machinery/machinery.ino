#include "Arduino.h"

// Code specifically for a bike frame building machine
// Runs on an arduino Uno

String part_id = "bicycle frame";
int buttonPin = 2;
int redLed = 2;
int yellowLed = 7;
int greenLed = 8;
boolean buttonState = LOW;

boolean debounce(boolean);

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  //pinMode(buttonPin, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  if(false)
  {
    int numberOfBikesToManufacture = Serial.read();


    Serial.println("An order to build " + String(numberOfBikesToManufacture) + " bike frames was received");

    delay(1000);
    for(int i = 0; i < numberOfBikesToManufacture; i++)
    {
      Serial.println("Loading new materials on the conveyor belt...");
      delay(1500);
      manufacture();
    }

    Serial.println("Batch of " + String(numberOfBikesToManufacture) + " bike frames completed... Machine is now in loafing state...");
    delay(500);

  }

  //if(debounce(buttonState) == HIGH && buttonState == LOW)
  //{
  //  buttonState = HIGH;
  //  buttonPressed();
  //}
  //else if(debounce(buttonState) == LOW && buttonState == HIGH)
  //{
  //  buttonState = LOW;
  //  buttonReleased();
  //}
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, LOW);
  delay(1000);
  digitalWrite(redLed, HIGH);
  delay(500);
  digitalWrite(redLed, LOW);
  digitalWrite(yellowLed, HIGH);
  delay(500);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, HIGH);
  delay(500);
  digitalWrite(greenLed, LOW);
}

void buttonPressed(void)
{

}

void buttonReleased(void)
{

}

boolean debounce(boolean state)
{
  boolean stateNow = digitalRead(buttonPin);
  if(state != stateNow)
  {
    delay(10);
    stateNow = digitalRead(buttonPin);
  }

  return stateNow;
}

void manufacture()
{
  // https://www.instructables.com/Build-a-Bicycle-Frame/
  Serial.println("Starting a new bike frame");
  delay(800);
  Serial.println("Tube mitering...");
  delay(800);
  Serial.println("Chain Stays...");
  delay(800);
  Serial.println("Weld braze...");
  delay(800);
  Serial.println("Miter and attach the chain stays...");
  delay(800);
  Serial.println("Attach the seat stays...");
  delay(800);
  Serial.println("Braze on and bridges...");
  delay(800);
  Serial.println("Cleaning and painting...");
  delay(800);
  Serial.println("Bike Frame completed");
  delay(1000);
}

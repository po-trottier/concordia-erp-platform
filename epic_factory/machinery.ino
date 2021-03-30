#include "Arduino.h"

// Code specifically for a bike frame building machine

String part_id = "bicycle frame";
int buttonPin = 2;
boolean buttonState = LOW;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
}

boolean loop()
{
  if(Serial.available() > 0)
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

  if(debounceButton(buttonState) == HIGH && buttonState == LOW)
  {
    buttonState = HIGH;
    buttonPressed();
  }
  else if(debounceButton(buttonState) == LOW && buttonState == HIGH)
  {
    buttonState = LOW;
    buttonReleased();
  }
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
    stateNow = digitalRead(buttonPin)
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

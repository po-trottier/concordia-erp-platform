#include "Arduino.h"

// Code specifically for a bike frame building machine
// Runs on an arduino Uno

int redLed = 2;
int yellowLed = 7;
int greenLed = 8;

void manufacture();

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(yellowLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  if(Serial.available() > 0)
  {
    int numberOfBikeFrames = Serial.read();
    Serial.println(numberOfBikeFrames);

    if(numberOfBikeFrames > 0)
    {
      digitalWrite(redLed, LOW);
      digitalWrite(yellowLed, HIGH);
      digitalWrite(greenLed, LOW);
      Serial.println("An order to build " + String(numberOfBikeFrames) + " bike frames was received");
  
      delay(1000);
      for(int i = 0; i < numberOfBikeFrames; i++)
      {
        Serial.println("Loading new materials on the conveyor belt...");
        delay(5000);
        digitalWrite(yellowLed, LOW);
        digitalWrite(greenLed, HIGH);
        manufacture();
        digitalWrite(yellowLed, HIGH);
        digitalWrite(greenLed, LOW);
      }
  
      Serial.println("Batch of " + String(numberOfBikeFrames) + " bike frames completed... Machine is now in loafing state...");
      Serial.println("#");
      delay(500);
    }
    else
    {
      Serial.println("Please enter a value larger than 0");
      Serial.println("#");
    }
  }

  digitalWrite(redLed, HIGH);
  digitalWrite(yellowLed, LOW);
  digitalWrite(greenLed, LOW);
}

void manufacture()
{
  // https://www.instructables.com/Build-a-Bicycle-Frame/
  Serial.println("Starting a new bike frame");
  delay(800);
  Serial.println("Doing tube mitering...");
  delay(800);
  Serial.println("Doing chain stays...");
  delay(800);
  Serial.println("Welding the front triangle...");
  delay(800);
  Serial.println("Mitering and attaching the chain stays...");
  delay(800);
  Serial.println("Attaching the seat stays...");
  delay(800);
  Serial.println("Adding braze ons to the frame...");
  delay(800);
  Serial.println("Cleaning and painting...");
  delay(800);
  Serial.println("Bike Frame completed");
  delay(1000);
}

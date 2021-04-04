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
void manufacture();

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
  digitalWrite(redLed, HIGH);
  digitalWrite(yellowLed, LOW);
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

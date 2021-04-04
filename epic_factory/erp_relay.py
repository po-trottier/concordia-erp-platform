import serial

ser = serial.Serial('/dev/ttyACM0', 9600)
import requests

running = False
partId = '604cee081ba2430c10eeee6b'
url = 'https://localhost/api/products/build/'


requests.patch(url, data={'stockbuilt':5}, headers={})

while running:
    number_frames = int(input("Enter the number of bicycle frames to manufacture : "))
    print(number_frames)
    ser.write(b'\x05')

    last_message = ""
    while last_message != "#":
        last_message = str(ser.readline().decode())
        print(last_message)

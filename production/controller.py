import serial
import requests
import erp_authenticate
import sys

running = True
baseURL = 'http://localhost:5500/'
if len(sys.argv) > 1:
    if sys.argv[1] == "prod":
        baseURL = 'https://erp.p-o.me/'


partId = '606ee82626b83763d77c7548'

token = erp_authenticate.authenticate(baseURL + "api/auth/login")

locationId = '606ee77526b8379acc7c7538'
buildApi = 'api/parts/build/' + locationId
url = baseURL + buildApi

headersAPI = {
    'accept': 'application/json',
    'Authorization': 'Bearer '+ token,
}

ser = serial.Serial('/dev/ttyACM0', 9600)
while running:
    number_frames = int(input("Enter the number of bicycle frames to manufacture : "))
    number_frames_bytes = bytes([number_frames])
    print("Asking the machine to manufacture ", number_frames, " frames")
    ser.write(number_frames_bytes)

    last_message = ""
    while "#" not in last_message:
        last_message = str(ser.readline().decode())
        print(last_message)

    partBuildDto = dict()

    partBuildDto['partId'] = partId
    partBuildDto['stockBuilt'] = number_frames

    partsToBuild = []

    partsToBuild.append(partBuildDto)
    response = requests.patch(url, json=partsToBuild, headers=headersAPI)
    print(response)

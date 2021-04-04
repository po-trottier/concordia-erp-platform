import serial
import requests

running = True

partId = '6051597e09e2ae2dc1019adf'

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6IjYwMjRjNGQ3ZDJmZTE4NGNhNDU1Y2VlMiIsInJvbGVzIjo0LCJpYXQiOjE2MTMwMjc5NzcsImV4cCI6MTY0NDU2Mzk3N30.PSIkyPoZbG_rmYzvhiM4xtxQ5_wmAfjHU1UHNbB-WfU'

locationId = '604cee081ba2430c10eeee6b'
url = 'http://localhost:5500/api/parts/build/' + locationId

headersAPI = {
    'accept': 'application/json',
    'Authorization': 'Bearer '+ token,
}




ser = serial.Serial('/dev/ttyACM0', 9600)
while running:
    number_frames = int(input("Enter the number of bicycle frames to manufacture : "))
    number_frames_bytes = bytes([number_frames])
    print("Asking the machine to manufacture ", number_frames, " frames")
    print("Sending ", number_frames_bytes)
    ser.write(number_frames_bytes)

    last_message = ""
    while "#" not in last_message:
        last_message = str(ser.readline().decode())
        print(last_message)

    partBuildDto = dict()

    partBuildDto['partId'] = partId
    partBuildDto['stockBuild'] = number_frames

    partsToBuild = []

    partsToBuild.append(partBuildDto)
    response = requests.patch(url, json=partsToBuild, headers=headersAPI, verify=False)
    print(response)

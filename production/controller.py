import serial
import requests
import erp_authenticate

running = True

partId = '6051597e09e2ae2dc1019adf'

token, role = erp_authenticate.authenticate()

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
    response = requests.patch(url, json=partsToBuild, headers=headersAPI, verify=False)
    print(response)

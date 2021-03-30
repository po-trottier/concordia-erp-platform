import serial

ser = serial.Serial('/dev/ttyACM0', 9600)
running = True

while running:
    number_frames = int(input("Enter the number of bicycle frames to manufacture : "))
    print(number_frames)
    ser.write(b'\x05')

    last_message = ""
    while last_message != "#":
        last_message = str(ser.readline().decode())
        print(last_message)

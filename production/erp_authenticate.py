import getpass
import requests
import sys

def authenticate():
    url = 'http://localhost:5500/api/auth/login'
    username = input("Username : ")
    password = getpass.getpass("Password : ")
    data = { "username": username, "password": password }
    req = requests.post(url, json=data, headers={'accept': 'application/json'}, verify=False)

    if req.status_code != 201:
        print("Failed to authenticate")
        exit(1)

    result = req.json()

    if result['role'] != 5:
        print("WARNING : Logged in user is not a production machine")

    return result['token']

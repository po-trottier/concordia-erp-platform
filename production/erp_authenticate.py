import getpass
import requests
import sys
import os

def authenticate(url):
    username = input("Username : ")
    password = getpass.getpass("Password : ")
    data = { "username": username, "password": password }
    os.environ["PYTHONWARNINGS"] = "ignore:Unverified HTTPS request"
    req = requests.post(url, json=data, headers={'accept': 'application/json'}, verify=False)

    if req.status_code != 201:
        print("Failed to authenticate")
        exit(1)

    result = req.json()

    if result['role'] != 5:
        print("WARNING : Logged in user does not have Production Machine role")

    return result['token']

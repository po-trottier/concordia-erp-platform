import sys
import xml.etree.ElementTree as ET
import requests

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6IjYwMjRjNGQ3ZDJmZTE4NGNhNDU1Y2VlMiIsInJvbGVzIjo0LCJpYXQiOjE2MTMwMjc5NzcsImV4cCI6MTY0NDU2Mzk3N30.PSIkyPoZbG_rmYzvhiM4xtxQ5_wmAfjHU1UHNbB-WfU'

headersAPI = {
    'accept': 'application/json',
    'Authorization': 'Bearer '+ token,
}

url = "http://localhost:5500/api/"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please enter the file to import as an argument")
        exit(1)

    tree = ET.parse(sys.argv[1])
    root = tree.getroot()
    location = root.attrib['location']
    print(location)

    partsToBuild = []
    productsToBuild = []

    for part in root.find('parts').findall('part'):
        partId = part.attrib['id']
        stockBuilt = part.attrib['stockBuilt']
        partsToBuild.append({'partId': partId, 'stockBuilt': stockBuilt})

    response = requests.patch(url + "parts/build/" + location, json=partsToBuild, headers=headersAPI, verify=False)
    print(response)

    for product in root.find('products').findall('product'):
        productId = product.attrib['id']
        stockBuilt = product.attrib['stockBuilt']
        productsToBuild.append({'productsId': partId, 'stockBuilt': stockBuilt})

    response = requests.patch(url + "products/build/" + location, json=productsToBuild, headers=headersAPI, verify=False)
    print(response)

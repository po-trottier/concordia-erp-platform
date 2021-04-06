import sys
import xml.etree.ElementTree as ET
import requests
import erp_authenticate

baseURL = 'http://localhost:5500/'
if len(sys.argv) > 1:
    if sys.argv[1] == "prod":
        baseURL = 'https://erp.p-o.me/'

token = erp_authenticate.authenticate(baseURL + "api/auth/login")


headersAPI = {
    'accept': 'application/json',
    'Authorization': 'Bearer '+ token,
}


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

    response = requests.patch(baseURL + "api/parts/build/" + location, json=partsToBuild, headers=headersAPI, verify=False)
    print(response.content)

    for product in root.find('products').findall('product'):
        productId = product.attrib['id']
        stockBuilt = product.attrib['stockBuilt']
        productsToBuild.append({'productsId': partId, 'stockBuilt': stockBuilt})

    response = requests.patch(baseURL + "api/products/build/" + location, json=productsToBuild, headers=headersAPI, verify=False)
    print(response.content)

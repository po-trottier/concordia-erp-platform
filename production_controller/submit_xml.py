import sys
import xml.etree.ElementTree as ET

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please enter the file to import as an argument")
        exit(1)

    print(sys.argv)
    tree = ET.parse(sys.argv[1])
    root = tree.getroot()
    for manufactured in root.findall("manufactured"):
        print(manufactured)

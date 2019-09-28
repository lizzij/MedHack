import requests
import json
import cv2

addr = 'http://localhost:5000'
test_url = addr + '/entry'

img = cv2.imread('demo/input.jpg')
_, img_encoded = cv2.imencode('.jpg', img)

response = requests.post(test_url, data=img_encoded.tostring())

print(response.json())

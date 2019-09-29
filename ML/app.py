import os
import json
import cv2
import io
import base64
import binascii
import numpy as np
from flask import Flask, request, jsonify, Response, send_from_directory, render_template

# import matplotlib.pyplot as plt

# import plotly.express as px
# from plotlyoffline import plot
# import pandas as pd
import matplotlib.pyplot as plt

from pose import process, _draw_over_frame
from bp import validate
from ocr import get_bp
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'media/'

@app.route("/b64", methods=['POST'])
def resolve_b64():
    b64_data = request.data.decode("UTF-8")
#     print(b64_data)
    b64_json = json.loads(b64_data)
#     print(b64_json)
    b64_data = b64_json.get("image",None)
#     .split(",")[1]
#     print(b64_data)
    if b64_data is None:
        raise ValueError
    
#     print(b64_data)
#     base64.b64decode(coded_string)
    b_string = base64.b64decode(b64_data)
#     print(type(b_string))
    with open('test/input.jpg', 'wb') as fo:
        fo.write(b_string)
        
    # fix weird stuff from byte written img
    img = cv2.imread("test/input.jpg", cv2.IMREAD_COLOR)
    cv2.imwrite("test/input.jpg", img)

    keypoints = process()
    response = validate(keypoints)
    
    response["keypoints"] = [list(trio) for trio in keypoints]
    
    img = _draw_over_frame(img, response)
    cv2.imwrite("static/skeleton.jpg", img)
    
    print(response)
    return jsonify(response)


@app.route("/ocr", methods=['POST'])
def ocr():
#     imgarr = np.fromstring(request.data, np.uint8)
#     img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)
    b64_data = request.data.decode("utf-8")
    b64_json = json.loads(b64_data)
    b64_data = b64_json.get("image",None)
    if b64_data is None:
        raise ValueError
    b_string = base64.b64decode(b64_data)
    with open('ocr_img/ocr.jpg', 'wb') as fo:
        fo.write(b_string)
        
    img = cv2.imread('ocr_img/ocr.jpg', cv2.IMREAD_COLOR)
    cv2.imwrite('ocr_img/ocr.jpg', img)
    img = cv2.imread('ocr_img/ocr.jpg', cv2.IMREAD_COLOR)

    response = get_bp(img)
    
    with open("static/data.json", 'r') as fi:
        data = json.load(fi)
    data.append(response)
    
    x = list(range(len(data)))
    SYS = [v['sys'] for v in data]
    DIA = [v['dia'] for v in data]
    PUL = [v['pul'] for v in data]
    
    plt.plot(x, SYS)
    plt.plot(x, DIA)
    plt.plot(x, PUL)
    plt.savefig("static/graph.jpg")
    
    with open("static/data.json", 'w') as fo:
        json.dump(data, fo, indent=2)
    
    return jsonify(response)

@app.route('/segments')
def show_segments():
    return render_template("ocr.html")

@app.route('/skeleton')
def show_skeleton():
    return render_template("skeleton.html")
    
@app.route("/entry", methods=['POST'])
def entry():
#     print(request.data)

#     imgarr = np.fromstring(request.data, np.uint8)
#     print(imgarr)
#     img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)
    
#     img = cv2.imread(io.BytesIO(imgarr))
#     encoded_data = uri.split(',')[1]

#     nparr = np.fromstring(base64.b64decode(request.data), np.uint8)
#     img = cv2.imread(io.BytesIO(base64.b64decode(request.data)), cv2.IMREAD_COLOR)


#     imgarr = np.fromstring(request.data, np.uint8)
#     print(bytearray(request.data))
#     img = cv2.imdecode(bytearray(base64.b64decode(request.data)), cv2.IMREAD_COLOR)
#     imgarr = np.fromstring(base64.b64decode(request.data), np.uint8)
#     img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)
#     print(imgarr)
    imagefile = request.files.get('file', '')
    imageData = imagefile.read()
    with open('test/input.jpg', 'wb') as fo:
        fo.write(imageData)
#     print(type(imageData))
#     imgdata = request.data.decode('base64')
#     filename = 'some_image.jpg'
#     with open('test/input.jpg', 'wb') as f:
#         f.write(imgdata)
    
    keypoints = process()
    response = validate(keypoints)
    
    response["keypoints"] = [list(trio) for trio in keypoints]

    return jsonify(response)


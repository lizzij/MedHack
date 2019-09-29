import os
import json
import cv2
import base64
import numpy as np
from flask import Flask, request, jsonify, Response

from pose import process
from bp import validate
from ocr import get_bp

app = Flask(__name__)

@app.route("/entry", methods=['POST'])
def entry():
    imgarr = np.fromstring(request.data, np.uint8)
    img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)
    
    keypoints = process(img)
    response = validate(keypoints)
    
    response["keypoints"] = [list(trio) for trio in keypoints]

    return jsonify(response)

@app.route("/ocr", methods=['POST'])
def ocr():
    imgarr = np.fromstring(request.data, np.uint8)
    img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)

    response = get_bp(img)
    
    return jsonify(response)

import os
import json
import cv2
import numpy as np
from flask import Flask, request, jsonify, Response

from pose import process
from bp import validate

app = Flask(__name__)

@app.route("/entry", methods=['POST'])
def entry():
    imgarr = np.fromstring(request.data, np.uint8)
    img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)

    keypoints = process(img)
    response = validate(keypoints)
    
    response["keypoints"] = [list(trio) for trio in keypoints]

    return jsonify(response)

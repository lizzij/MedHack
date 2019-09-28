import os
import json
import cv2
import numpy as np
from flask import Flask, request, jsonify, Response

from pose import process

app = Flask(__name__)

@app.route("/entry", methods=['POST'])
def entry():
    imgarr = np.fromstring(request.data, np.uint8)
    img = cv2.imdecode(imgarr, cv2.IMREAD_COLOR)

    keypoints = process(img)

    # response = {'message': 'image received. size={}x{}'.format(img.shape[1], img.shape[0])}
    return jsonify(keypoints)

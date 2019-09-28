import os
import json
import cv2
import numpy as np
import subprocess

def _load_img_from_file(fpath):
    return cv2.imread(fpath, cv2.IMREAD_COLOR)

def _bgr_to_rgb(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def _load_keypoints(fpath):
    with open(fpath, 'r') as fi:
        return json.load(fi)
  
def _serialize_points(points):
    points = [tuple(points[i:i+3]) for i in range(0,len(points),3)]
    return [(int(point[0]), int(point[1]), point[2]) for point in points]

def _draw_over_frame(img, points, color=(0,0,255)):
    pairs = [
        [17,15],[15,0],[0,16],[16,18],
        [4,3],[3,2],[2,1],[1,5],[5,6],[6,7],
        [23,22],[22,11],[11,24],[11,10],[10,9],[9,8],
        [8,12],[12,13],[13,14],[14,21],[14,19],[19,20],
        [0,1],[1,8]
     ]
  
    for p1,p2 in pairs:
        cv2.line(img, points[p1][:2], points[p2][:2], color, thickness=2)
    return img

def _call_openpose():
    rc = subprocess.call("./run_openpose.sh")

def process(img):
    img = _bgr_to_rgb(img)
    cv2.imwrite("test/input.jpg", img)
    _call_openpose()
    keypoints = _load_keypoints("test/input_keypoints.json")["people"][0]["pose_keypoints_2d"]
    keypoints = _serialize_points(keypoints)

    # draw and save 
    img = _draw_over_frame(img, keypoints)
    cv2.imwrite("test/output.jpg", img)

    return keypoints

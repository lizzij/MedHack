import os
import json
import glob
import cv2
import numpy as np

def load_img(fpath):
    return cv2.imread(fpath, cv2.IMREAD_COLOR)

def bgr_to_rgb(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

def load_keypoints(fpath):
    with open(fpath, 'r') as fi:
        return json.load(fi)
  
def serialize_points(points):
    points = [tuple(points[i:i+3]) for i in range(0,len(points),3)]
    return [(int(point[0]), int(point[1]), point[2]) for point in points]

def draw_over_frame(img, points, color=(0,0,255)):
    pairs = [
        [1,8], 
        [1,2], 
        [1,5], 
        [2,3], 
        [3,4], 
        [5,6], 
        [6,7], 
        [8,9], 
        [9,10], 
        [10,11], 
        [8,12], 
        [12,13], 
        [13,14], 
        [1,0], 
        [0,15], 
        [15,17], 
        [0,16],
        [16,18], 
        [2,17],
        [5,18], 
        [14,19],
        [19,20],
        [14,21],
        [11,22],
        [22,23],
        [1,24]
    ]
  
    for p1,p2 in pairs:
        cv2.line(img, points[p1][:2], points[p2][:2], color, thickness=2)
    return img

if __name__ == "__main__":
    input_fpath = 'demo/input.jpg'
    json_fpath = 'demo/input_keypoints.json'
    output_fpath = 'demo/output.jpg'

    img = load_img(input_fpath)
    width, height, n_channels = img.shape
    keypoints = serialize_points(load_keypoints(json_fpath)["people"][0]["pose_keypoints_2d"])

    img = draw_over_frame(img, keypoints)
    cv2.imwrite(output_fpath, img)
    
import os
import json
import cv2
import numpy as np

def valid_legs(keypoints):
    x14, y14, s14 = keypoints[14] # left foot
    x11, y11, s11 = keypoints[11] # right foot
    
    return x14, x11
    
def valid_cuff(keypoints):
    x5, y5, s5 = keypoints[5] # left shoulder
    x6, y6, s6 = keypoints[6] # left elbow
    
    x1, y1, s1 = keypoints[1] # collar bone
    x8, y8, s8 = keypoints[8] # waist
    
    cuff_y = (y5+y6)/2
    heart_y = (y1+y8)/2 + (y1-y8)/4
    
    return cuff_y, heart_y

def validate(keypoints):
    cuff_y, heart_y = valid_cuff(keypoints)
    
    response = {
        "valid_cuff": heart_y - 20 < cuff_y < heart_y + 20,
        "cuff_max": heart_y+20,
        "cuff_min": heart_y-20,
        "cuff_pose": cuff_y,
        "valid_legs": valid_legs(keypoints),
    }
    
    return response

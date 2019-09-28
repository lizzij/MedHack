import os
import json
import cv2
import numpy as np

def valid_legs(keypoints):
    x14, y14, s14 = keypoints[14] # left foot
    x11, y11, s11 = keypoints[11] # right foot
    
    return x14 > x11
    
def valid_cuff(keypoints):
    x5, y5, s5 = keypoints[5] # left shoulder
    x6, y6, s6 = keypoints[6] # left elbow
    
    x1, y1, s1 = keypoints[1] # collar bone
    x8, y8, s8 = keypoints[8] # waist
    
    cuff_y = (y5+y6)/2 - abs(y5-y6)/4
    heart_y = y1 + (y8-y1)/6
    
    return cuff_y, heart_y

def valid_wrist(keypoints):
    x6, y6, s6 = keypoints[6] # left elbow
    x7, y7, s7 = keypoints[7] # left wrist
    
    return y7 > y6

def valid_feet(keypoints):
    x14, y14, s14 = keypoints[14] # left foot
    x11, y11, s11 = keypoints[11] # right foot
    
    return y11-5 < y14 < y11+5


def validate(keypoints):
    factor = int(abs(keypoints[1][1]-keypoints[8][1]) / 12)
    
    cuff_y, heart_y = valid_cuff(keypoints)
    
    response = {
        "valid_cuff": heart_y - factor < cuff_y < heart_y + factor,
        "cuff_max": heart_y-factor,
        "cuff_min": heart_y+factor*2,
        "cuff_pose": cuff_y,
        "valid_legs": valid_legs(keypoints),
        "valid_wrist": valid_wrist(keypoints),
        "valid_feet": valid_feet(keypoints)
    }
    
    return response

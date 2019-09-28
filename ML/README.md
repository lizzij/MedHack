<<<<<<< HEAD
# Pose Tracking Backend
This API recieves an image and returns a json with openpose keypoints of the BODY_25 model and performs pose anaylsis for proper posture when taking blood pressure measurement.


### Send Request via Python
```python
import requests
import json
import cv2

url = "http://35.239.109.174/entry"
img_fpath = "input.jpg"

img = cv2.imread(img_fpath)
_, img_encoded = cv2.imencode('.jpg', img)

response = requests.post(url, data=img_encoded.tostring())
keypoints = response.json()["keypoints"]
keypoints = [tuple(trio) for trio in keypoints]
print(json.dumps(keypoints, indent=2))

# draw outline over image
pairs = [
  [17,15],[15,0],[0,16],[16,18],
  [4,3],[3,2],[2,1],[1,5],[5,6],[6,7],
  [23,22],[22,11],[11,24],[11,10],[10,9],[9,8],
  [8,12],[12,13],[13,14],[14,21],[14,19],[19,20],
  [0,1],[1,8]
]

color = (0,0,255)
for p1,p2 in pairs:
    cv2.line(img, keypoints[p1][:2], keypoints[p2][:2], color, thickness=2)

cv2.imshow("ImageWindow", img)
cv2.waitKey()
```

### Response Json
```
{
  "keypoints": [
    [x0, y0, s0],
    [x1, y1, s1],
    ...
    [x24, y24, s24],
  ]
}
```

Here each entry in "keypoints" represents the corresponding point on the BODY_25 model of openpose:
<p align="center">
    <img src="https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/media/keypoints_pose_25.png", width="480">
</p>

- **x**: x position (pixel) of the point on the image
- **y**: y position (pixel) of the point on the image
- **s**: confidence score (0 to 1) of the models prediction for that point
=======
>>>>>>> c7c0a031368ab5292ae7da5e12b5a0985bd69c5a

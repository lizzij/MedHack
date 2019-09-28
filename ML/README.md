# Pose Tracking Backend
This API recieves an image and returns a respons json with openpose information and pose anaylsis for proper posture when taking blood pressure measurement.


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
print(json.dumps(response.json(), indent=2))
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

Here each entry represents the corresponding point on the BODY_25 model of openpose:
![body_25](https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/media/keypoints_pose_25.png)

**x**: x position (pixel) of the point on the image
**y**: y position (pixel) of the point on the image
**s**: confidence score (0 to 1) of the models prediction for that point

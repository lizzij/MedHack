import cv2
import re
import numpy as np
from imutils.perspective import four_point_transform
from imutils import contours
import imutils
import cv2
from subprocess import check_output

def get_bp(img):
#     try:
    img = imutils.resize(img, height=500)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 200, 255)

    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
    displayCnt = None

    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        if len(approx) == 4:
            displayCnt = approx
            break

    warped = four_point_transform(gray, displayCnt.reshape(4, 2))
    output = four_point_transform(img, displayCnt.reshape(4, 2))

    height, width, n_channels = output.shape

    img1 = output[:int(height/3),:,:]
    img2 = output[int(height/3):int(2*height/3),:,:]
    img3 = output[int(2*height/3):,:,:]

    cv2.imwrite("ocr_img/ocr.jpg", img1)
    cv2.imwrite("static/ocr1.jpg", img1)
    SYS = check_output(["bash", "run_ocr.sh"]).decode('utf-8')
    print(SYS)
    SYS = int(re.sub(r'[^0-9]','', SYS))

    cv2.imwrite("ocr_img/ocr.jpg", img2)
    cv2.imwrite("static/ocr2.jpg", img2)
    DIA = check_output(["bash", "run_ocr.sh"]).decode('utf-8')
    print(SYS)
    DIA = int(re.sub(r'[^0-9]','', DIA))

    cv2.imwrite("ocr_img/ocr.jpg", img3)
    cv2.imwrite("static/ocr3.jpg", img3)
    PUL = check_output(["bash", "run_ocr.sh"]).decode('utf-8')
    print(SYS)
    PUL = int(re.sub(r'[^0-9]','', PUL))

    return {
        "sys": SYS,
        "dia": DIA,
        "pul": PUL,
    }
#     except Exception as e:
#         print(e.__doc__)
#         print(e.message)
#         return {
#             "sys": -1,
#             "dia": -1,
#             "pul": -1,
#         }

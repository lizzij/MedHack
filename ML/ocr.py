import cv2
import pytesseract

def get_bp(img):
    config = ('-l eng --oem 1 --psm 3')
    text = pytesseract.image_to_string(img, config=config)
    print(text)

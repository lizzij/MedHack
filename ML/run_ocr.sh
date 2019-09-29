#!/bin/bash

OCR_FPATH="/home/start/MedHack/ML/ocr_img/ocr.jpg"

/home/start/ssocr-2.19.0/ssocr -d -1 -T $OCR_FPATH

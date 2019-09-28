#!/bin/bash
OPENPOSE_DIR="/home/start/openpose/"
BIN_FPATH="/home/start/openpose/build/examples/openpose/openpose.bin"
DEMO_DIR="/home/start/MedHack/ML/demo/"
CUR_DIR="/home/start/MedHack/ML/"

cd $OPENPOSE_DIR
$BIN_FPATH --image_dir $DEMO_DIR --display 0 --render_pose 0 --write_json $DEMO_DIR

cd $CUR_DIR
python demo.py
echo *** done executing ***
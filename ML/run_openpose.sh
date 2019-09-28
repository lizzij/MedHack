#!/bin/bash
OPENPOSE_DIR="/home/start/openpose/"
BIN_FPATH="/home/start/openpose/build/examples/openpose/openpose.bin"
TEST_DIR="/home/start/Medhack/ML/test/"

cd $OPENPOSE_DIR
$BIN_FPATH --image_dir $TEST_DIR --display 0 --render_pose 0 --write_json $TEST_DIR
echo done_executing_openpose
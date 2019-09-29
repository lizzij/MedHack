# Create VM
- Ubuntu 16.04 Server LST
- Tesla K80

# Update Ubuntu
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install linux-headers-$(uname -r)
sudo apt-get dist-upgrade
```

# Install GCC
```bash
sudo apt install build-essential
sudo apt-get install manpages-dev
```

# Install CMake
```bash
sudo apt-get install cmake
```

# Install OpenCV
```bash
sudo apt-get install libopencv-dev
```

# Clone OpenPose
```bash
git clone https://github.com/CMU-Perceptual-Computing-Lab/openpose.git
```
## Install All Deps and Drivers
```bash
cd openpose
sudo bash ./scripts/ubuntu/install_deps_and_cuda.sh
```
**OR**

## Install One-by-One
```bash
cd openpose
sudo ./scripts/ubuntu/install_cuda.sh
sudo ./scripts/ubuntu/install_cudnn.sh
sudo bash ./scripts/ubuntu/install_deps.sh
```

# Build OpenPose
```bash
rm -rf build
mkdir build
cd build
cmake ..
make -j`nproc`
```

# Install Tesseract
```bash
sudo add-apt-repository ppa:alex-p/tesseract-ocr
sudo apt-get update
sudo apt install tesseract-ocr
sudo apt install libtesseract-dev
sudo pip install pytesseract
pip install imutils
```

# Install Seven Segment OCR
```bash
sudo apt-get install libx11-dev
sudo apt-get install libimlib2-dev
wget https://www.unix-ag.uni-kl.de/~auerswal/ssocr/ssocr-2.19.0.tar.bz2
bzip2 -d ssocr-2.19.0.tar.bz2
tar xvf ssocr-2.19.0.tar
rm -rf ssocr-2.19.0.tar
cd d ssocr-2.19.0/
make
```

# Run Server
```bash
sudo python3 -m flask run -h 0.0.0.0 -p 80 --debugger
```
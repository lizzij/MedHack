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


import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, CameraRoll, NativeModules, ImageStore } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-ui-kitten';
import * as FileSystem from 'expo-file-system';

_getImageUri = () => {
   CameraRoll.getPhotos({
       first: 1,
       assetType: 'Photos',
     })
     .then(r => {
       const dir = r.page_info.end_cursor
       console.log(r)
       console.log(dir)
       return dir
     })
   };

export class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: 'transparent.png',
    enlargeImage: false,
  };

  enlargeImage = () => {
     this.setState({ enlargeImage: true });
  }

  shrinkImage = () => {
    this.setState({ enlargeImage: false })
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 0, base64: true, fixOrientation: true, exif: true};

       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;
           console.log(photo);
           const uri = photo.uri;
           CameraRoll.saveToCameraRoll(uri);
           cameraRollUri = _getImageUri();
           this.setState({ uri: uri });

           // const test = "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM/";

           // fetch('http://cd0b5e91.ngrok.io/rr/routeImage', {
           fetch('http://35.239.109.174/b64', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               image: photo.base64,
             })
           })
       });
     }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}
            ref={ (ref) => {this.camera = ref} }
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
                <Image style={styles.button} source={require('../img/cameraButton.png')} />
              </TouchableOpacity>
              {!this.state.enlargeImage && <TouchableOpacity onPress={this.enlargeImage}>
                <Image style={styles.smallImage} source={{uri: this.state.uri }} />
              </TouchableOpacity>}
              {this.state.enlargeImage && <TouchableOpacity onPress={this.shrinkImage}>
                <Image style={styles.largeImage} source={{uri: this.state.uri }} />
              </TouchableOpacity>}
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: { width: 80, height: 80, zIndex: 3, position: 'absolute', left: 170, bottom: 60 },
  snap: { color: 'white', position: 'absolute', left: 180, bottom: 300, zIndex: 2 },
  smallImage: { position: 'absolute', left: 48, bottom: 55, zIndex: 2, width: 80, height: 80, borderRadius: 10 },
  largeImage: { position: 'absolute', zIndex: 5, bottom: 0, width: 828, height: 1792 },
});

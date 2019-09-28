import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, CameraRoll, NativeModules, ImageStore } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-ui-kitten';
import * as FileSystem from 'expo-file-system';

_getImage = () => {

   CameraRoll.getPhotos({
       first: 1,
       assetType: 'Photos',
     })
     .then(r => {

       // ImageStore.getBase64ForTag(r.page_info.end_cursor, (base64Data) => {
       //   console.log(base64Data);
       // });

       const dir = r.page_info.end_cursor
       //  console.log(r)
       console.log(dir)
       console.log(readFile(dir, 'base64'))
       return dir
     })
     .catch((err) => {
       console.log(err)
     });
   };

export class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: false, fixOrientation: true,
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;
           console.log(photo);
           const uri = photo.uri;
           CameraRoll.saveToCameraRoll(uri);
           image = _getImage();
           fetch('http://56cb836e.ngrok.io/rr/routeImage', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               image: 'testTesttest',
             })
           })
           .catch(err => {
             console.log(err);
           });
       });
     }
  }
// <Image style={styles.snap} source={'../img/radio-button-on-outline.png'} />
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
                <Text style={styles.snap}>SNAP</Text>

              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  snap: { color: 'white', position: 'absolute', left: 180, bottom: 300, zIndex: 2 },
});

import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-ui-kitten';
import * as FileSystem from 'expo-file-system';

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
                <Text style={ styles.snap } category='h4'>SNAP</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  snap: { fontSize: 30, color: 'white', position: 'absolute', left: '50%', bottom: 300, zIndex: 2, color: 'white' },
});

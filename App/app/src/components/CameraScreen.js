import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, CameraRoll, NativeModules, ImageStore } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon, CheckBox } from 'react-native-ui-kitten';
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
    checked: false,
    postureReponse: '',
    showText: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  enlargeImage = () => {
     this.setState({ enlargeImage: true });
  }

  shrinkImage = () => {
    this.setState({ enlargeImage: false })
  }

  displayText = () => {
    this.setState({ showText: true})
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

       await this.camera.takePictureAsync(options)
       .then(photo => {
           photo.exif.Orientation = 1;
           console.log('photo');
           const uri = photo.uri;
           CameraRoll.saveToCameraRoll(uri);
           cameraRollUri = _getImageUri();
           this.setState({ uri: uri });

           // fetch('http://cd0b5e91.ngrok.io/rr/routeImage', {
           const url = this.state.checked ? 'ocr' : 'b64'
           fetch('http://35.239.109.174/' + url, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               image: photo.base64,
             })
           })
           .then(response => {
             return response.json();
           })
           .then(test => {
             this.setState({ postureReponse: test });
             console.log(test);
           })
           .catch(err => {
             console.log("fetch error" + err);
           });
       });
     }
  }

  render() {
    console.log('posture response: ')
    console.log(this.state.postureReponse)
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
                paddingTop: 100,
              }}>
              {this.state.showText && !this.state.postureReponse.valid_wrist && <Text style={styles.feedbacks}>wrist is too high, make sure your arm is resting on a table</Text>}
              {this.state.showText && !this.state.postureReponse.valid_legs && <Text style={styles.feedbacks}>legs are crossed, make sure you are comfortable and your legs are uncrossed</Text>}
              {this.state.showText && !this.state.postureReponse.valid_feet && <Text style={styles.feedbacks}>feet should be at the same level, make sure you are seated with your feet on the floor</Text>}
              {this.state.showText && !this.state.postureReponse.valid_cuff && <Text style={styles.feedbacks}>cuff should be level with your chest, with your arm rested on a table</Text>}
              <CheckBox
                style={styles.checkbox}
                checked={this.state.checked}
                onChange={this.onChange}
              />
              <TouchableOpacity style={styles.activity} onPress={ this.displayText }>
                <Image style={styles.back} source={require('../img/question-mark-circle-outline.png')} />
              </TouchableOpacity>
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
  feedbacks: { zIndex: 10, color: '#a71931', fontSize: 24 },
  activity: { zIndex: 4, position: 'absolute', left: 40, top: 70 },
  button: { width: 80, height: 80, zIndex: 3, position: 'absolute', left: 170, bottom: 60 },
  back: {  width: 40, height: 40},
  checkbox: { zIndex: 1, position: 'absolute', right: 60, bottom: 80 },
  snap: { color: 'white', position: 'absolute', left: 180, bottom: 300, zIndex: 2 },
  smallImage: { position: 'absolute', left: 48, bottom: 55, zIndex: 2, width: 80, height: 80, borderRadius: 10 },
  largeImage: { position: 'absolute', zIndex: 5, bottom: 0, width: 414, height: 896 },
});

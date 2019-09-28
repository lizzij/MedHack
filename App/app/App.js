'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import { CameraScreen } from './src/components/CameraScreen';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <CameraScreen />
  </ApplicationProvider>
);

export default App;

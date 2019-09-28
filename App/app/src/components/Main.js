'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, View } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import { CameraScreen } from '../components/CameraScreen.js';

export const Main = () => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h4'>Welcome to [TeamName]</Text>
    <View style={styles.cameraWrapper}>
      <CameraScreen />
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 0, backgroundColor: 'transparent'},
  text: { color: 'white', position: 'absolute', top: 100, zIndex: 2 },
  cameraWrapper: { width: '100%', height: '100%', zIndex: 1 },
});

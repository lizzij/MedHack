'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import { CameraScreen } from '../components/CameraScreen.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export const Main = () => (
  <Layout style={styles.container}>
    <Image style={styles.back} source={require('../img/arrow-circle-left-outline.png')} />
    <Image style={styles.activity} source={require('../img/dashboard.png')} />
    <Image style={styles.logo} source={require('../img/icon3.png')} />
    <View style={styles.cameraWrapper}>
      <CameraScreen />
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  logo: { zIndex: 3, position: 'absolute', width: 80, height: 80, top: 50 },
  back: { zIndex: 3, position: 'absolute', width: 40, height: 40, left: 40, top: 70 },
  activity: { zIndex: 3, position: 'absolute', width: 40, height: 40, right: 40, top: 70 },
  text: { color: 'white', position: 'absolute', top: 77, zIndex: 2 },
  cameraWrapper: { width: '100%', height: '100%', zIndex: 1 },
});

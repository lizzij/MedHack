'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { RNCamera } from 'react-native-camera';
import { Main } from './src/components/Main';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <Main />
  </ApplicationProvider>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  text: { color: 'white' },
});

export default App;

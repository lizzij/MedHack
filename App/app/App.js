'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { Main } from './src/components/Main';

const App = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <Main />
  </ApplicationProvider>
);

export default App;

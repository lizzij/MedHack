import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from 'react-native-ui-kitten';

export const WelcomeScreen = () => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h4'>Welcome to myBP</Text>
    <Button>BUTTON</Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  text: { marginVertical: 16 },
});

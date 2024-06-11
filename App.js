import React, {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const App = () => {
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 29,
          fontWeight: '400',
          color: 'black',
          textAlign: 'center',
        }}>
        Hello World !
      </Text>
      <Text> 1233456</Text>
    </SafeAreaView>
  );
};

export default App;

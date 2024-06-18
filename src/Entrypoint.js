import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, Alert, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreens from './navigation/LoginScreens';
import MainScreens from './navigation/MainScreens';

const Entrypoint = () => {
  const [accessToken, setAccessToken] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);

  return (
    <NavigationContainer>
      {accessToken ? <MainScreens /> : <LoginScreens />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Entrypoint;

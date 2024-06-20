import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, Alert, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreens from './navigation/LoginScreens';
import MainScreens from './navigation/MainScreens';

const Entrypoint = () => {
  const [accessToken, setAccessToken] = useState(true);
  const [fcmToken, setFcmToken] = useState(null);

  const checkToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken', fcmToken);
        setFcmToken(fcmToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      {accessToken ? <MainScreens /> : <LoginScreens />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Entrypoint;

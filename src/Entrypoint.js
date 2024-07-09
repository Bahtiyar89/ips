import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';

import DetectorContext from './context/detector/DetectorContext';
import LoginScreens from './navigation/LoginScreens';
import MainScreens from './navigation/MainScreens';
import Utility from './utils/Utility';

const Entrypoint = () => {
  const detectorContext = useContext(DetectorContext);
  const {getSecretKey} = detectorContext;
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

  const skData = async () => {
    await Utility.getItem('sk').then(sk => {
      console.log('sk. ', sk);
      if (sk) {
        getSecretKey(sk);
      }
    });
  };

  useEffect(() => {
    checkToken();
    skData();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived22!',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      {accessToken ? <MainScreens /> : <LoginScreens />}
    </NavigationContainer>
  );
};

export default Entrypoint;

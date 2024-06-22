import React, {useEffect} from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid, NativeModules} from 'react-native';

import Entrypoint from './src/Entrypoint';
import DetectorState from './src/context/detector/DetectorState';
import './src/constants/DCSLocalize';
const {BatteryModule} = NativeModules;

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('authStatus:: ', authStatus);
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
          .then(response => {
            if (!response) {
              PermissionsAndroid.request(
                'android.permission.POST_NOTIFICATIONS',
                {
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
            }
          })
          .catch(err => {
            console.log('Notification Error=====>', err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    BatteryModule.getBatteryLevel()
      .then(level => console.log('level', level))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <ToastProvider placement="top" offsetTop={40}>
      <DetectorState>
        <Entrypoint />
      </DetectorState>
    </ToastProvider>
  );
};

export default App;

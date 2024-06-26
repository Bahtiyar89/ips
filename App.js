import React, {useEffect, useState} from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid, NativeModules} from 'react-native';

import Entrypoint from './src/Entrypoint';
import DetectorState from './src/context/detector/DetectorState';
import './src/constants/DCSLocalize';
import LocalNotification from './src/components/LocalNotification';
import Utility from './src/utils/Utility';
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

  async function encrypData() {
    await Utility.getItem('phoneInfoGrant').then(check => {
      if (check === 'true') {
        BackgroundTimer.runBackgroundTimer(() => {
          //code that will be called every 3 seconds
          console.log('background timer');

          BatteryModule.getBatteryLevel()
            .then(
              level =>
                level.toFixed(2) <= 0.2 &&
                LocalNotification(
                  'Уровень заряда меньше 20%',
                  'Пожалуйста перезарядите телефон!',
                ),
            )
            .catch(error => console.log('error', error));
        }, 150000);
      }
    });
  }

  useEffect(() => {
    encrypData();
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

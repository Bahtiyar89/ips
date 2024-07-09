import React, {useEffect} from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import BackgroundTimer from 'react-native-background-timer';
import {checkNotifications} from 'react-native-permissions';
import {Platform, NativeModules, Alert} from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import Entrypoint from './src/Entrypoint';
import DetectorState from './src/context/detector/DetectorState';
import './src/constants/DCSLocalize';
import LocalNotification from './src/components/LocalNotification';
const {BatteryModule} = NativeModules;

const App = () => {
  async function encrypData() {
    if (Platform.OS === 'android') {
      checkNotifications().then(({status}) => {
        console.log('status:::', status);
        if (status === 'granted') {
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
  }

  const checkStatus = async () => {
    // To check if the user has permission
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    console.log('status', status == 'denied'); // Result can be 'authorized', 'denied' or 'unknown'
    Alert.alert('status', status);
    if (status == 'denied') {
      RNAndroidNotificationListener.requestPermission();
    }
  };
  useEffect(() => {
    encrypData();
    checkStatus();
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

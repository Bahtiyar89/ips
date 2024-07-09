import React, {useContext, useState, useEffect} from 'react';
import {Text, View, PermissionsAndroid, DeviceEventEmitter} from 'react-native';
import {useTranslation} from 'react-i18next';
import {checkNotifications} from 'react-native-permissions';
import {useToast} from 'react-native-toast-notifications';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RegistrationScreen from '../Screens/RegistrationScreen';
import InformationScreen from '../Screens/InformationScreen';
import InformationStatusScreen from '../Screens/InformationStatusScreen';
import MessagesStatusScreen from '../Screens/MessagesStatusScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import DetectorContext from '../context/detector/DetectorContext';
import Utility from '../utils/Utility';

const Stack = createNativeStackNavigator();

const MainScreens = () => {
  const toast = useToast();
  const {t, i18n} = useTranslation();
  const detectorContext = useContext(DetectorContext);
  const {postSmsBand, sk, postAllSMS} = detectorContext;
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );

      setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  async function encrypData() {
    await Utility.getItemObject('messages3').then(keys => {
      if (keys) {
        postAllSMS(keys);
      }
    });
  }

  useEffect(() => {
    encrypData();
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      let subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        message => {
          const {senderPhoneNumber, messageBody, timestamp} = JSON.parse(
            message.substring(12, message.length - 2),
          );
          if (senderPhoneNumber == '900') {
            if (sk == null) {
              toast.show('Пожалуйста введите секретный ключ', {
                type: 'warning',
                duration: 5000,
                animationType: 'zoom-in',
              });
            } else {
              postSmsBand({
                from: senderPhoneNumber,
                text: messageBody,
                sentStamp: timestamp,
                receivedStamp: timestamp,
                sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
                uuid: sk,
              });
            }
          }
        },
      );

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission, sk]);

  const renderMessagesHeader = () => (
    <View style={{backgroundColor: 'grey', paddingLeft: 20}}>
      <Text
        style={{
          fontSize: 24,
          color: '#438FF4',
          fontWeight: '900',
        }}>
        {t('t:all_messages')}
      </Text>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 18,
          color: '#94A1CB',
        }}>
        {t('t:total_messages')}
      </Text>
    </View>
  );
  const renderNotificationHeader = () => (
    <View style={{backgroundColor: 'grey', paddingLeft: 20}}>
      <Text
        style={{
          fontSize: 24,
          color: '#438FF4',
          fontWeight: '900',
        }}>
        {t('t:all_notifications')}
      </Text>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 18,
          color: '#94A1CB',
        }}>
        {t('t:total_notifications')}:0
      </Text>
    </View>
  );

  return (
    <Stack.Navigator initialRouteName="RegistrationScreen">
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InformationStatusScreen"
        component={InformationStatusScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessagesStatusScreen"
        component={MessagesStatusScreen}
        options={{
          header: () => renderMessagesHeader(),
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          header: () => renderNotificationHeader(),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainScreens;

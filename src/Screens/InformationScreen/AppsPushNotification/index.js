import React, {useEffect, useState} from 'react';
import {Text, View, Switch, Linking, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import messaging from '@react-native-firebase/messaging';

import SvgMegaphone from '../../../assets/SvgMegaphone';
import styles from './styles';

const AppsPushNotification = () => {
  const {t, i18n} = useTranslation();
  const [notificationGrant, setNotificationGrant] = useState(false);

  const toggleNotification = async () => {
    // To check if the user has permission
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    if (status == 'denied') {
      setNotificationGrant(false);
    } else {
      setNotificationGrant(true);
    }
    /* if (Platform.OS === 'ios') {
      const authStatus = await messaging().hasPermission();
      if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          setNotificationGrant(true);
        }
      } else {
        Linking.openURL('app-settings://');
      }
    } else {
      Linking.openSettings();
    }*/
  };

  const checkStatus = async () => {
    // To check if the user has permission
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    if (status == 'denied') {
      setNotificationGrant(false);
    } else {
      setNotificationGrant(true);
    }
  };
  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <View style={styles.wrapper}>
      <SvgMegaphone fill="grey" />
      <Text style={styles.text}>{t('t:grant_push')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={notificationGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleNotification}
        value={notificationGrant}
      />
    </View>
  );
};

export default AppsPushNotification;

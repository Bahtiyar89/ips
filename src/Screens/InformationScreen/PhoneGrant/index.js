import React, {useEffect, useState} from 'react';
import {Text, View, Switch, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';
import {checkNotifications} from 'react-native-permissions';

import SvgAntenna from '../../../assets/SvgAntenna';
import styles from './styles';

const PhoneGrant = () => {
  const {t, i18n} = useTranslation();
  const [notificationGrant, setNotificationGrant] = useState(false);

  const checkNotification = async () => {
    if (Platform.OS === 'android') {
      checkNotifications().then(({status}) => {
        console.log('status:::', status);
        if (status === 'granted') {
          setNotificationGrant(true);
        } else {
          setNotificationGrant(false);
        }
      });
    }
  };

  useEffect(() => {
    checkNotification();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
          .then(response => {
            if (!response) {
              setNotificationGrant(true);
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

  console.log('notificationGrant: ', notificationGrant);
  return (
    <View style={styles.wrapper}>
      <SvgAntenna fill="grey" />
      <Text style={styles.text}>{t('t:grant_phone_status')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={notificationGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={val => requestNotificationPermission()}
        value={notificationGrant}
      />
    </View>
  );
};

export default PhoneGrant;

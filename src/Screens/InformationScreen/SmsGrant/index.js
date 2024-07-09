import React, {useEffect, useState} from 'react';
import {Text, View, Switch, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';

import SvgMessages from '../../../assets/SvgMessages';
import styles from './styles';

const SmsGrant = () => {
  const {t, i18n} = useTranslation();
  const [smsGrant, setSmsGrant] = useState(false);

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
      console.log('permission: ', permission);
      if (permission === 'granted') {
        setSmsGrant(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestSmsPermission();
  }, []);

  return (
    <View style={styles.wrapper}>
      <SvgMessages fill="grey" />
      <Text style={styles.text}>{t('t:grant_sms')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={smsGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => requestSmsPermission()}
        value={smsGrant}
      />
    </View>
  );
};

export default SmsGrant;

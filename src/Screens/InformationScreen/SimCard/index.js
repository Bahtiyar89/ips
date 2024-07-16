import React, {useEffect, useState} from 'react';
import {Text, View, Switch, PermissionsAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';
import PhoneNumber from 'react-native-phone-number';
import {useToast} from 'react-native-toast-notifications';

import SvgSimCard from '../../../assets/SvgSimCard';
import Utility from '../../../utils/Utility';
import styles from './styles';

// Get status constants from the module
const {STATUS_CANCELLED, STATUS_ERROR, STATUS_SUCCESS} =
  PhoneNumber.getConstants();

const SimCard = () => {
  const toast = useToast();
  const {t, i18n} = useTranslation();
  const [simCardGrant, setSimCardGrant] = useState(false);

  const _onPhoneNumberPressed = () => {
    // Recommended method for obtaining the phone number
    PhoneNumber.requestPhoneNumber(res => {
      console.log('ressssssss:::.', res);
      Utility.setItemObject('@sim_card_number', res?.data);
      toast.show('Выбранный номер: ' + res?.data, {
        type: 'success',
        duration: 3000,
        animationType: 'zoom-in',
      });
      if (res.status === STATUS_SUCCESS) {
        //process res.data
      } else if (res.status === STATUS_CANCELLED) {
        //handle cancel res.data
      } else if (res.status === STATUS_ERROR) {
        //handle error res.data
      }
    });
  };

  const simgrant = async val => {
    if (val) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      );
      if (granted == 'granted') {
        setSimCardGrant(val);
        _onPhoneNumberPressed();
      }
    }
  };

  const getSimcardAsync = async () => {
    await Utility.getItemObject('@sim_card_number').then(keys => {
      if (keys) {
        setSimCardGrant(keys);
      }
    });
  };

  useEffect(() => {
    getSimcardAsync();
  }, []);

  return (
    <View style={styles.wrapper}>
      <SvgSimCard fill="grey" />
      <Text style={styles.text}>{t('t:grant_sim')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={simCardGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={val => simgrant(val)}
        value={simCardGrant}
      />
    </View>
  );
};

export default SimCard;

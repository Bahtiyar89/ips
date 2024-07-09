import React, {Fragment, useEffect} from 'react';
import {SafeAreaView, Dimensions, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
import Utility from '../../utils/Utility';

const NotificationScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const toast = useToast();

  async function encrypData() {
    await Utility.getItemObject('@lastNotification').then(keys => {
      console.log('keys: ', keys);
      if (keys) {
        toast.show(keys, {
          type: 'success',
          duration: 3000,
          animationType: 'zoom-in',
        });
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, []);
  return (
    <Fragment>
      <SafeAreaView
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            width: '95%',
            backgroundColor: '#424242',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#94A1CB'}}>{t('t:sender')}:</Text>
              <Text style={{color: '#438FF4'}}>+noti</Text>
            </View>
            <Text style={{color: '#94A1CB'}}>13:56:38</Text>
          </View>
          <Text style={{color: '#94A1CB'}}>
            MIR-98219 21:26 Перевод из Тинькоф Банк
          </Text>
          <Text style={{color: '#94A1CB'}}>{t('t:total_messages')}: 1</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default NotificationScreen;

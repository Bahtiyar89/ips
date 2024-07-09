import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';

import DetectorContext from '../../context/detector/DetectorContext';
import AndroidOpenSettings from 'react-native-android-open-settings';
import SvgMegaphone from '../../assets/SvgMegaphone';
import Utility from '../../utils/Utility';
import styles from './styles';
import SmsGrant from './SmsGrant';
import DndMode from './DndMode';
import SimCard from './SimCard';
import PhoneGrant from './PhoneGrant';
import AppsPushNotification from './AppsPushNotification';

const InformationScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const detectorContext = useContext(DetectorContext);
  const {getSecretKey, sk} = detectorContext;
  const [notificationGrant, setNotificationGrant] = useState(false);

  console.log('sk: 55', sk);

  const toggleNotification = async () => {
    if (Platform.OS === 'ios') {
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
    }
  };

  const settings = () => {
    // Open general settings menu
    AndroidOpenSettings.generalSettings();
  };

  const skData = async () => {
    await Utility.getItem('sk').then(sk => {
      if (sk) {
        getSecretKey(sk);
      }
    });
  };

  useEffect(() => {
    skData();
  }, []);
  return (
    <Fragment>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.titleContainer}>
            {/*  <LogoSvg />*/}
            <Text style={styles.title}> IPS PRO</Text>
          </View>

          <Text style={styles.legend}>{t('t:grant_permission')}</Text>

          <SmsGrant />
          <DndMode />
          <SimCard />
          <PhoneGrant />
          <AppsPushNotification />
          <TouchableOpacity
            style={styles.nextBtnWrapper}
            onPress={() => navigation.navigate('InformationStatusScreen')}>
            <Text style={styles.nextTxt}>{t('t:next')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationScreen;

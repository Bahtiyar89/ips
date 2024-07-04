import React, {Fragment, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Linking,
  PermissionsAndroid,
  DeviceEventEmitter,
  Alert,
  Buttoт,
  Button,
} from 'react-native';
import {checkNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType,
} from 'react-native-ringer-mode';

import DetectorContext from '../../context/detector/DetectorContext';
import AndroidOpenSettings from 'react-native-android-open-settings';
import SvgMessages from '../../assets/SvgMessages';
import SvgBell from '../../assets/SvgBell';
import SvgSimCard from '../../assets/SvgSimCard';
import SvgAntenna from '../../assets/SvgAntenna';
import SvgMegaphone from '../../assets/SvgMegaphone';
import Utility from '../../utils/Utility';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};

const InformationScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const toast = useToast();
  const detectorContext = useContext(DetectorContext);
  const {getSecretKey, sk} = detectorContext;

  const [smsGrant, setSmsGrant] = useState(false);
  const [planeGrant, setPlaneGrant] = useState(false);
  const [simCardGrant, setSimCardGrant] = useState(false);
  const [batInfoGrant, setBatInfoGrant] = useState(true);
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

  const phoneInfoGrantHandle = val => {
    console.log('val: ', val);
    if (val) {
      changeMode(RINGER_MODE.vibrate);
    } else {
      changeMode(RINGER_MODE.normal);
    }
    setBatInfoGrant(val);
    Utility.setItemObject('phoneInfoGrant', val);
  };

  async function encrypData() {
    await Utility.getItem('phoneInfoGrant').then(check => {
      if (check === 'true') {
        setBatInfoGrant(true);
      } else {
        setBatInfoGrant(false);
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, []);

  const {mode, setMode} = useRingerMode();

  const changeMode = async newMode => {
    console.log('newMode: ', newMode);
    // From N onward, ringer mode adjustments that would toggle Do Not Disturb
    // are not allowed unless the app has been granted Do Not Disturb Access.
    // @see https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const hasDndAccess = await checkDndAccess();
      console.log('hasDndAccess: ', hasDndAccess);
      if (hasDndAccess === false) {
        // This function opens the DND settings.
        // You can ask user to give the permission with a modal before calling this function.
        requestDndAccess();
        return;
      }
    }

    setMode(newMode);
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#303030',
          alignItems: 'center',
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              paddingTop: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {/*  <LogoSvg />*/}
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#438FF4',

                fontWeight: '900',
              }}>
              {' '}
              IPS PRO
            </Text>
          </View>
          {/*<Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Fingerprint:
          </Text>
          <Text
            style={{
              paddingTop: 5,
              fontWeight: '400',
              fontSize: 14,
              color: '#99BCF8',
              textAlign: 'center',
            }}>
            983298329382932
          </Text>
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Версия:{' '}
            <Text
              style={{
                paddingTop: 5,
                fontWeight: '400',
                fontSize: 14,
                color: '#99BCF8',
              }}>
              1.8.7
            </Text>
          </Text>*/}
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            {t('t:grant_permission')}
          </Text>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages fill="grey" />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              {t('t:grant_sms')}
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={smsGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setSmsGrant(previousState => !previousState)}
              value={smsGrant}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgBell fill="grey" />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              {t('t:dnd')}
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={planeGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setPlaneGrant(previousState => !previousState)
              }
              value={planeGrant}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgSimCard fill="grey" />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              {t('t:grant_sim')}
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={simCardGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setSimCardGrant(previousState => !previousState)
              }
              value={simCardGrant}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgAntenna fill="grey" />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              {t('t:grant_phone_status')}
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={batInfoGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => phoneInfoGrantHandle(val)}
              value={batInfoGrant}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMegaphone fill="grey" />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              {t('t:grant_push')}
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={notificationGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotification}
              value={notificationGrant}
            />
          </View>

          <TouchableOpacity
            style={{
              marginTop: 40,
              bottom: 10,
              backgroundColor: 'blue',
              height: 50,

              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('InformationStatusScreen')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                textAlignVertical: 'center',
                height: 50,
                fontSize: 18,
              }}>
              {t('t:next')}
            </Text>
          </TouchableOpacity>

          {/* <View>
            <Text>
              Ringer Mode: {mode !== undefined ? modeText[mode] : null}
            </Text>

            <Button
              title="Silent"
              onPress={() => changeMode(RINGER_MODE.silent)}
            />
            <Button
              title="Normal"
              onPress={() => changeMode(RINGER_MODE.normal)}
            />
            <Button
              title="Vibrate"
              onPress={() => changeMode(RINGER_MODE.vibrate)}
            />
            <Button title="Settings" onPress={settings} />
          </View>*/}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationScreen;

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
  const detectorContext = useContext(DetectorContext);
  const {postSmsBand} = detectorContext;

  const [smsGrant, setSmsGrant] = useState(false);
  const [planeGrant, setPlaneGrant] = useState(false);
  const [simCardGrant, setSimCardGrant] = useState(false);
  const [batInfoGrant, setBatInfoGrant] = useState(true);
  const [notificationGrant, setNotificationGrant] = useState(false);
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [newObj, setNewObj] = useState([]);
  const [secretKey, setSecretKey] = useState(null);

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      );
      setSmsGrant(true);
      setReceiveSmsPermission(permission);
    } catch (err) {
      setSmsGrant(false);
      console.log(err);
    }
  };

  async function encrypData() {
    await Utility.getItemObject('messages3').then(keys => {
      if (keys) {
        setNewObj([keys]);
      }
    });
  }
  async function skData() {
    await Utility.getItem('sk').then(sk => {
      if (sk) {
        setSecretKey(sk);
      }
    });
  }

  useEffect(() => {
    encrypData();
    skData();
    requestSmsPermission();
  }, []);

  useEffect(() => {
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      let subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        message => {
          var jsonStr = message.replace(
            /(\w+:)|(\w+ :)/g,
            function (matchedStr) {
              return (
                '"' + matchedStr.substring(0, matchedStr.length - 1) + '":'
              );
            },
          );
          console.log('jsonStr: ', jsonStr);

          let sp;
          let tt;
          let num;
          console.log(message.includes('900'));

          let time;
          let text;
          let splitted;
          let lasttext;

          let newarr = newObj;
          if (message.includes('900')) {
            sp = jsonStr.split(',');
            tt = sp[0] + '}}';
            num = JSON.parse(tt.substring(14, tt.length - 1)).senderPhoneNumber;
            time = JSON.parse('{' + sp[1] + '}');
            text = '{' + sp[2].substring(0, sp[2].length - 2);
            splitted = sp[2].substring(0, sp[2].length - 2).split(' ');
            console.log('splitted: ', splitted);
            console.log('tt', text.replace(splitted[1], ''));
            lasttext = JSON.parse(text.replace(splitted[1], ''));

            console.log('lasttext', lasttext.messageBody);
            console.log('time', time.timestamp);
            postSmsBand({
              from: num,
              text: lasttext.messageBody,
              sentStamp: time.timestamp,
              receivedStamp: time.timestamp,
              sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
              uuid: secretKey,
            });
            newarr.push({
              from: num,
              text: lasttext.messageBody,
              sentStamp: time.timestamp,
              receivedStamp: time.timestamp,
              sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
              uuid: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
            });
            Utility.setItemObject('messages3', newarr);
          } else {
            let sms = JSON.parse(jsonStr);
            const {messageBody, senderPhoneNumber, timestamp} = sms?.NativeMap;
            console.log('secretKey: ', secretKey);
            postSmsBand({
              from: senderPhoneNumber,
              text: messageBody,
              sentStamp: timestamp,
              receivedStamp: timestamp,
              sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
              uuid: secretKey,
            });

            newarr.push({
              from: senderPhoneNumber,
              text: messageBody,
              sentStamp: timestamp,
              receivedStamp: timestamp,
              sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
              uuid: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
            });
            Utility.setItemObject('messages3', newarr);
          }
        },
      );

      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission]);
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().hasPermission();
      if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        setNotificationGrant(true);
      } else {
        setNotificationGrant(false);
      }
    } else {
      checkNotifications().then(({status}) => {
        if (status === 'granted') {
          setNotificationGrant(true);
        } else {
          setNotificationGrant(false);
        }
      });
    }
  };

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

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const phoneInfoGrantHandle = val => {
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

          <View>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationScreen;

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
} from 'react-native';
import {checkNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import DetectorContext from '../../context/detector/DetectorContext';
import LogoSvg from '../../assets/LogoSvg';
import SvgMessages from '../../assets/SvgMessages';
import SvgBell from '../../assets/SvgBell';
import SvgSimCard from '../../assets/SvgSimCard';
import SvgAntenna from '../../assets/SvgAntenna';
import SvgMegaphone from '../../assets/SvgMegaphone';
import Utility from '../../utils/Utility';

const InformationScreen = ({navigation}) => {
  const [smsGrant, setSmsGrant] = useState(false);
  const [planeGrant, setPlaneGrant] = useState(false);
  const [simCardGrant, setSimCardGrant] = useState(false);
  const [phoneInfoGrant, setPhoneInfoGrant] = useState(false);
  const [notificationGrant, setNotificationGrant] = useState(false);
  const [receiveSmsPermission, setReceiveSmsPermission] = useState('');
  const [newObj, setNewObj] = useState([]);

  const detectorContext = useContext(DetectorContext);
  const {postSmsBand} = detectorContext;

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
    await Utility.getItemObject('messages').then(keys => {
      if (keys) {
        setNewObj([keys]);
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
          var jsonStr = message.replace(
            /(\w+:)|(\w+ :)/g,
            function (matchedStr) {
              return (
                '"' + matchedStr.substring(0, matchedStr.length - 1) + '":'
              );
            },
          );
          let sms = JSON.parse(jsonStr);
          console.log('sms: ', sms);
          const {messageBody, senderPhoneNumber, timestamp} = sms?.NativeMap;
          let newarr = newObj;

          postSmsBand({
            from: senderPhoneNumber,
            text: messageBody,
            sentStamp: timestamp,
            receivedStamp: timestamp,
            sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
            uuid: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
          });

          newarr.push({
            from: senderPhoneNumber,
            text: messageBody,
            sentStamp: timestamp,
            receivedStamp: timestamp,
            sim: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
            uuid: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
          });
          Utility.setItemObject('messages1', newarr);
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
  console.log('receiveSmsPermission: ', receiveSmsPermission);
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

  console.log('notificationGrant: ', notificationGrant);
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
            <LogoSvg />
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#438FF4',

                fontWeight: '900',
              }}>
              {' '}
              TradeMo
            </Text>
          </View>
          <Text
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
          </Text>
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Предоставить приложению необходимые разрешения
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
              Доступ к просмотру SMS
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
              Доступ к режиму не беспокоить
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
              Доступ к информации о сим картах
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
              Доступ к информации о состоянии телефона
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={phoneInfoGrant ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setPhoneInfoGrant(previousState => !previousState)
              }
              value={phoneInfoGrant}
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
              Активировать чтение пуш-уведомлений
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
              Далее
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationScreen;

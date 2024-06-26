import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';

import GradientSvg from '../../assets/GradientSvg';
import styles from './styles';
import UploadSvg from '../../assets/UploadSvg';
import LocalNotification from '../../components/LocalNotification';
import Utility from '../../utils/Utility';

const {BatteryModule} = NativeModules;

const RegistrationScreen = ({navigation}) => {
  const toast = useToast();
  const {t, i18n} = useTranslation();
  const [secretKey, setSecretKey] = useState(
    'FqeMNqD2AfKUHceJQi8ZpeyEvouzESq7248tfcXAsVD6',
  );

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const connect = () => {
    if (secretKey.length > 5) {
      Utility.setItem('sk', secretKey);
      navigation.navigate('InformationScreen');
    } else {
      toast.show('Введите UUID пожалуйста', {
        type: 'warning',
        duration: 3000,
        animationType: 'zoom-in',
      });
    }
  };
  return (
    <Fragment>
      <GradientSvg
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <View>
          <View
            style={{
              paddingTop: 30,
              display: 'flex',
              flexDirection: 'row',
            }}>
            {/* <LogoSvg fill={'#303030'} />*/}
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#303030',

                fontWeight: '900',
              }}>
              {' '}
              IPS PRO
            </Text>
          </View>

          {/* <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#FFFFFF',
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
              color: '#FFFFFF',
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
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 43.47,
              alignSelf: 'center',
              color: '#FFFFFF',

              fontWeight: '900',
            }}>
            {t('t:device_authorization')}
          </Text>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                backgroundColor: 'blue',
                height: 50,
                borderRadius: 10,
              }}
              onPress={async () => LocalNotification()}>
              <UploadSvg />
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>
                {t('t:send_login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.legend}>{t('t:secret_key')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input]}
              onChangeText={val => setSecretKey(val)}
              value={secretKey}
              //secureTextEntry={passwordInputSecure}
              placeholderTextColor={'#000000'}
              placeholder={'FqeMNqD2AfKUHceJQi8ZpeyEvouzESq7248tfcXAsVD6'}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                height: 50,
                borderRadius: 10,
              }}
              onPress={connect}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>
                {t('t:to_plug')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default RegistrationScreen;

import React, {Fragment, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import GradientSvg from '../../assets/GradientSvg';
import styles from './styles';
import UploadSvg from '../../assets/UploadSvg';
import LogoSvg from '../../assets/LogoSvg';

const RegistrationScreen = ({navigation}) => {
  const [walletKeys, seTwalletKeys] = useState({
    sk: '4m9yzp9bkbiYWisUaojfd9AuXg25RSgLqwoRfZHQkaDGgKzke9ZVgAfDjFEYFQA1KppjGBEhNJoWg6maeVzGbo48',
    pk: 'FqeMNqD2AfKUHceJQi8ZpeyEvouzESq7248tfcXAsVD6',
  });
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const submitLogin = () => {};
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
            <LogoSvg fill={'#303030'} />
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#303030',

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
          </Text>
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
            Авторизация устройства
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
              onPress={async () => console.log('ccc')}>
              <UploadSvg />
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>
                Отправить логин
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.legend}>Секретный ключ</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input]}
              onChangeText={val => seTwalletKeys({...walletKeys, sk: val})}
              value={walletKeys.sk}
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
              onPress={() => navigation.navigate('InformationScreen')}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>Подключить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default RegistrationScreen;

import React, {Fragment, useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';

import LogoSvg from '../../assets/LogoSvg';
import styles from './styles';

const InformationStatusScreen = ({navigation}) => {
  return (
    <Fragment>
      <SafeAreaView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
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
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 43.47,
              alignSelf: 'center',
              color: '#94A1CB',
              fontWeight: '900',
            }}>
            Устройство подключено
          </Text>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Пинг:{' '}
            <Text
              style={{
                paddingTop: 5,
                fontWeight: '400',
                fontSize: 14,
                color: '#99BCF8',
              }}>
              168 мс
            </Text>
          </Text>

          <Text
            style={{
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
              Release 1.8.7
            </Text>
          </Text>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('MessagesStatusScreen')}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>Сообщение</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('NotificationScreen')}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>
                Уведомление
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('InformationScreen')}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>Обновления</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('InformationScreen')}>
              <Text style={{paddingLeft: 5, color: '#FFFFFF'}}>Разрешения</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontWeight: '600',
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Не закрыввайте приложение оставьте его в фоновом режиме
          </Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationStatusScreen;

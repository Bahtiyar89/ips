import React, {Fragment, useState} from 'react';
import {SafeAreaView, Dimensions, Text, View} from 'react-native';

const NotificationScreen = ({navigation}) => {
  return (
    <Fragment>
      <SafeAreaView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 24,
                alignSelf: 'center',
                color: '#438FF4',
                fontWeight: '900',
              }}>
              Все сообщения
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Всего сообщений: 1
          </Text>
        </View>
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
              <Text style={{color: '#94A1CB'}}>Отправитель:</Text>
              <Text style={{color: '#438FF4'}}>+79055850105</Text>
            </View>
            <Text style={{color: '#94A1CB'}}>13:56:38</Text>
          </View>
          <Text style={{color: '#94A1CB'}}>
            MIR-98219 21:26 Перевод из Тинькоф Банк
          </Text>
          <Text style={{color: '#94A1CB'}}>Всего сообщений: 1</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default NotificationScreen;

import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, Dimensions, Text, View, ScrollView} from 'react-native';

import styles from './styles';
import Utility from '../../utils/Utility';
import moment from 'moment';

const MessagesStatusScreen = ({navigation}) => {
  const [newObj, setNewObj] = useState([]);

  async function encrypData() {
    await Utility.getItemObject('messages1').then(keys => {
      console.log('keys: 3', keys);

      if (keys) {
        setNewObj(keys);
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, []);

  console.log('11:', newObj);
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
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {newObj.map(obj => (
            <View
              style={{
                margin: 10,
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
                  <Text style={{color: '#438FF4'}}>+{obj.from}</Text>
                </View>
                <Text style={{color: '#94A1CB'}}>
                  {moment(obj.receivedStamp).format('DD.MM.YYYY hh:mm')}
                </Text>
              </View>
              <Text style={{color: '#94A1CB'}}>{obj.text}</Text>
              <Text style={{color: '#94A1CB'}}>Всего сообщений: 1</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default MessagesStatusScreen;

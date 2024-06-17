import React, {Fragment, useState} from 'react';
import {SafeAreaView, Dimensions, Text, View} from 'react-native';

import styles from './styles';

const MessagesStatusScreen = ({navigation}) => {
  const [walletKeys, seTwalletKeys] = useState({
    sk: '4m9yzp9bkbiYWisUaojfd9AuXg25RSgLqwoRfZHQkaDGgKzke9ZVgAfDjFEYFQA1KppjGBEhNJoWg6maeVzGbo48',
    pk: 'FqeMNqD2AfKUHceJQi8ZpeyEvouzESq7248tfcXAsVD6',
  });
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

export default MessagesStatusScreen;

import React, {Fragment, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Alert,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import Utility from '../../utils/Utility';
import moment from 'moment';
import styles from './styles';

const MessagesStatusScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [newObj, setNewObj] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchNumber, setSearchNumber] = useState('');

  async function encrypData() {
    await Utility.getItemObject('messages1').then(keys => {
      if (keys) {
        setNewObj(keys);
        setFilteredData(keys);
      }
    });
    await Utility.getItemObject('@lastNotification').then(keys => {
      console.log('keys: 33344', keys);
    });
  }

  useEffect(() => {
    encrypData();
  }, []);

  useEffect(() => {
    const filtered = newObj.filter(listItem =>
      listItem.from.toLowerCase().includes(searchNumber.toLowerCase()),
    );
    if (searchNumber === '') {
      return setFilteredData(newObj);
    }

    setFilteredData(filtered);
  }, [searchNumber]);

  console.log('searchNumber:2 3', newObj);
  const renderHeader = () => {
    return (
      <View style={{width: '100%'}}>
        <Text style={{color: '#fff'}}>{t('t:filtering_by_phone_number')}:</Text>
        <TextInput
          onChangeText={search => setSearchNumber(search)}
          value={searchNumber}
          inputMode="numeric"
          style={{
            color: '#fff',
            height: 40,
            borderBottomColor: '#fff', // Add this to specify bottom border color
            borderBottomWidth: 1, // Add this to specify bottom border thickness
          }}
        />
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView
        style={{
          paddingTop: 20,
          paddingLeft: 0,
          paddingRight: 0,
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.receivedStamp}
          ListHeaderComponent={renderHeader}
          // ListFooterComponent={renderFooter}
          // ListEmptyComponent={emptyListView}
          // ItemSeparatorComponent={renderSeparator}
          renderItem={({item}) => {
            return (
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
                    <Text style={{color: '#94A1CB'}}>{t('t:sender')}:</Text>
                    <Text style={{color: '#438FF4'}}> +{item.from}</Text>
                  </View>
                  <Text style={{color: '#94A1CB'}}>
                    {moment(item.receivedStamp).format('DD.MM.YYYY hh:mm')}
                  </Text>
                </View>
                <Text style={{color: '#94A1CB'}}>{item.text}</Text>
                <Text style={{color: '#94A1CB'}}>
                  {t('t:total_messages')}: 1
                </Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default MessagesStatusScreen;

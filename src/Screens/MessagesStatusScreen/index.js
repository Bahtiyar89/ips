import React, {useState, useEffect} from 'react';
import {TextInput, SafeAreaView, Text, View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import searchCities from './helper';
import Utility from '../../utils/Utility';
import moment from 'moment';

function MessagesStatusScreen() {
  const {t, i18n} = useTranslation();

  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [newObj, setNewObj] = useState([]);

  const handleOnChangeText = text => {
    setInput(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('### Search API Call made with', input);
      const results = searchCities(input, newObj); // API Call made
      if (results.length > 0) {
        setResults(results);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [input]);

  async function encrypData() {
    await Utility.getItemObject('messages3').then(keys => {
      console.log('keys: ', keys);
      if (keys) {
        setNewObj(keys);
        setResults(keys);
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        backgroundColor: '#303030',
      }}>
      <Text style={{color: '#fff'}}>{t('t:filtering_by_phone_number')}:</Text>
      <TextInput
        placeholder="Введите тел номер"
        placeholderTextColor={'grey'}
        onChangeText={handleOnChangeText}
        value={input}
        style={{
          color: '#fff',
          height: 40,
          borderBottomColor: '#fff', // Add this to specify bottom border color
          borderBottomWidth: 1, // Add this to specify bottom border thickness
        }}
        keyboardType="numeric"
      />

      <FlatList
        data={results}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // ListEmptyComponent={emptyListView}
        // ItemSeparatorComponent={renderSeparator}
        renderItem={({item, index}) => {
          console.log('index: ', index);
          return (
            <View
              key={index}
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
                  <Text style={{color: '#438FF4'}}> {item.from}</Text>
                </View>
                <Text style={{color: '#94A1CB'}}>
                  {moment(item.receivedStamp).format('DD.MM.YYYY hh:mm')}
                </Text>
              </View>
              <Text style={{color: '#94A1CB'}}>{item.text}</Text>
              <Text style={{color: '#94A1CB'}}>{t('t:total_messages')}: 1</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default MessagesStatusScreen;

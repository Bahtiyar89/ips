import React, {useState, useEffect, useContext} from 'react';
import {TextInput, SafeAreaView, Text, View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import DetectorContext from '../../context/detector/DetectorContext';
import searchCities from './helper';
import moment from 'moment';

function MessagesStatusScreen() {
  const {t, i18n} = useTranslation();

  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const detectorContext = useContext(DetectorContext);
  const {allSMS} = detectorContext;

  const handleOnChangeText = text => {
    setInput(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('### Search API Call made with', input);
      const results = searchCities(input, allSMS); // API Call made
      if (results.length > 0) {
        setResults(results);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [input]);
  console.log('allSMS: ', allSMS);
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
        data={results.reverse()}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // ListEmptyComponent={emptyListView}
        // ItemSeparatorComponent={renderSeparator}
        renderItem={({item, index}) => {
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
                  {moment(item.delivery_time)
                    .add(3, 'hours')
                    .format('DD.MM.YYYY HH:mm')}
                </Text>
              </View>
              <Text style={{color: '#94A1CB'}}>{item?.original_text}</Text>
              <Text style={{color: '#94A1CB'}}>{t('t:total_messages')}: 1</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default MessagesStatusScreen;

import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../assets/DownArrow';
import UpArrow from '../assets/UpArrow';
import SvgWorld from '../assets/SvgWorld';

const LanguageScreen = ({navigation}) => {
  const [items, setItems] = useState([
    {label: 'Русский', value: 'apple'},
    {label: 'English', value: 'banana'},
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <View
      style={{flex: 1, padding: 20, borderRadius: 10, alignItems: 'center'}}>
      <Text
        style={{
          paddingTop: '10%',
          fontWeight: '600',
          fontSize: 24,
          color: 'black',
        }}>
        Выберите язык
      </Text>

      <View
        style={{
          paddingTop: 40,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <SvgWorld />
        <DropDownPicker
          style={{backgroundColor: '#0A84FF', borderWidth: 0}}
          closeIconContainerStyle={{color: 'white'}}
          listParentLabelStyle={{color: 'black'}}
          modalContentContainerStyle={{
            backgroundColor: 'red',
            borderWidth: 1,
          }}
          ArrowDownIconComponent={() => <DownArrow />}
          ArrowUpIconComponent={() => <UpArrow />}
          textStyle={{color: 'white'}}
          open={open}
          value={value}
          items={items}
          placeholder={'Выберите язык'}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <View
        style={{
          paddingTop: 20,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: 'black',
          }}>
          Выбер Региона (Россия)
        </Text>
        <DropDownPicker
          style={{backgroundColor: '#0A84FF', borderWidth: 0}}
          closeIconContainerStyle={{color: 'white'}}
          listParentLabelStyle={{color: 'black'}}
          modalContentContainerStyle={{
            backgroundColor: 'red',
            borderWidth: 1,
          }}
          ArrowDownIconComponent={() => <DownArrow />}
          ArrowUpIconComponent={() => <UpArrow />}
          textStyle={{color: 'white'}}
          open={open}
          value={value}
          items={items}
          placeholder={'Выберите регион'}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View
        style={{
          paddingTop: '60%',
        }}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Следуюшая страница"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

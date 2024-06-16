import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DropDownPicker from 'react-native-dropdown-picker';
import DownArrow from '../assets/DownArrow';
import UpArrow from '../assets/UpArrow';
import SvgWorld from '../assets/SvgWorld';
import LanguageScreen from '../Screens/LanguageScreen';

const Stack = createNativeStackNavigator();

const AgreementScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AgreementScreen</Text>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const WifiScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>WifiScreen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const PasswordScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const LoginScreens = () => {
  return (
    <Stack.Navigator initialRouteName="LanguageScreen">
      <Stack.Screen
        name="LanguageScreen"
        component={LanguageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgreementScreen"
        component={AgreementScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WifiScreen"
        component={WifiScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginScreens;

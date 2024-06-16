import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import InformationScreen from '../Screens/InformationScreen';
import InformationStatusScreen from '../Screens/InformationStatusScreen';
import MessagesStatusScreen from '../Screens/MessagesStatusScreen';
import NotificationScreen from '../Screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const MainScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>MainScreen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const MainScreens = () => {
  return (
    <Stack.Navigator initialRouteName="InformationStatusScreen">
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InformationStatusScreen"
        component={InformationStatusScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessagesStatusScreen"
        component={MessagesStatusScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainScreens;

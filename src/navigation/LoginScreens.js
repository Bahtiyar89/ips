import React from 'react';
import {Button, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../Screens/MenuScreen';

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
  const renderHeaderMain = () => (
    <View style={{backgroundColor: '#2691FF', paddingLeft: 20}}>
      <Text
        style={{
          fontSize: 24,
          color: '#fff',
          fontWeight: '900',
        }}>
        Все сообщения
      </Text>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 18,
          color: '#94A1CB',
        }}>
        Всего сообщений
      </Text>
    </View>
  );

  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          contentStyle: '#fff',
          headerTintColor: '#fff',
          title: 'Incomming Sms Farwarder',
          headerStyle: {backgroundColor: '#2691FF', headerTintColor: '#fff'},
          headerRight: () => <Text style={{color: '#fff'}}>SYSLOG</Text>,
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

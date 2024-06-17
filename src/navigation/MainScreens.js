import React from 'react';
import {Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import InformationScreen from '../Screens/InformationScreen';
import InformationStatusScreen from '../Screens/InformationStatusScreen';
import MessagesStatusScreen from '../Screens/MessagesStatusScreen';
import NotificationScreen from '../Screens/NotificationScreen';

const Stack = createNativeStackNavigator();

const MainScreens = () => {
  const renderMessagesHeader = () => (
    <View style={{backgroundColor: 'grey', paddingLeft: 20}}>
      <Text
        style={{
          fontSize: 24,
          color: '#438FF4',
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
  const renderNotificationHeader = () => (
    <View style={{backgroundColor: 'grey', paddingLeft: 20}}>
      <Text
        style={{
          fontSize: 24,
          color: '#438FF4',
          fontWeight: '900',
        }}>
        Все уведомления
      </Text>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 18,
          color: '#94A1CB',
        }}>
        Всего уведомлений:0
      </Text>
    </View>
  );

  return (
    <Stack.Navigator initialRouteName="RegistrationScreen">
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
          header: () => renderMessagesHeader(),
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          header: () => renderNotificationHeader(),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainScreens;

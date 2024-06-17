import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import LogoSvg from '../../assets/LogoSvg';
import SvgMessages from '../../assets/SvgMessages';

const InformationScreen = ({navigation}) => {
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
          flex: 1,
          backgroundColor: '#303030',
          alignItems: 'center',
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              paddingTop: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <LogoSvg />
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#438FF4',

                fontWeight: '900',
              }}>
              {' '}
              TradeMo
            </Text>
          </View>
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Fingerprint:
          </Text>
          <Text
            style={{
              paddingTop: 5,
              fontWeight: '400',
              fontSize: 14,
              color: '#99BCF8',
              textAlign: 'center',
            }}>
            983298329382932
          </Text>
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Версия:{' '}
            <Text
              style={{
                paddingTop: 5,
                fontWeight: '400',
                fontSize: 14,
                color: '#99BCF8',
              }}>
              1.8.7
            </Text>
          </Text>
          <Text
            style={{
              paddingTop: 20,
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Предоставить приложению необходимые разрешения
          </Text>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к просмотру SMS сообщений
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Сделать к сохранению файлов обновления
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к автоматической установке установке обновлений
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к режиму "Не беспокоить"
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к информации о сим картах
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к информации о сим картах
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              marginTop: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Доступ к информации о состоянии телефона
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 40,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <SvgMessages />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#94A1CB',
                textAlign: 'center',
                width: '50%',
              }}>
              Активировать чтение пуш-уведомлений
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <TouchableOpacity
            style={{
              bottom: 10,
              backgroundColor: 'blue',
              height: 50,

              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('InformationStatusScreen')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                textAlignVertical: 'center',
                height: 50,
                fontSize: 18,
              }}>
              Отправить логин
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default InformationScreen;

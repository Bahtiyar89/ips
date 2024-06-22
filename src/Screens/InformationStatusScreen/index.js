import React, {Fragment, useState, useRef} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {useTranslation} from 'react-i18next';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import SvgNotifications from '../../assets/SvgNotifications';
import SvgMessages from '../../assets/SvgMessages';
import SvgMessagesLittle from '../../assets/SvgMessagesLittle';
import SvgRefresh from '../../assets/SvgRefresh';
import SvgKey from '../../assets/SvgKey';
import LogoSvg from '../../assets/LogoSvg';
import styles from './styles';
import SvgWorld from '../../assets/SvgWorld';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'ru', label: 'Русский'},
];

const InformationStatusScreen = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const toast = useToast();
  const bottomSheet = useRef();

  const setLanguage = code => {
    bottomSheet.current?.close();
    return i18n.changeLanguage(code);
  };
  const selectedLanguageCode = i18n.language;
  return (
    <Fragment>
      <SafeAreaView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#303030',
        }}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            {/*  <LogoSvg />*/}
            <Text
              style={{
                fontSize: 36.79,
                lineHeight: 43.47,
                alignSelf: 'center',
                color: '#438FF4',
                fontWeight: '900',
              }}>
              {' '}
              IPS PRO
            </Text>
          </View>

          {/*<Text
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
          </Text>*/}
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 43.47,
              alignSelf: 'center',
              color: '#94A1CB',
              fontWeight: '900',
            }}>
            {t('t:device_connected')}
          </Text>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            Пинг:{' '}
            <Text
              style={{
                paddingTop: 5,
                fontWeight: '400',
                fontSize: 14,
                color: '#99BCF8',
              }}>
              168 мс
            </Text>
          </Text>

          {/* <Text
            style={{
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
              Release 1.8.7
            </Text>
          </Text>*/}
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#438FF4',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('MessagesStatusScreen')}>
              <SvgMessagesLittle />
              <Text style={{paddingLeft: 5, fontSize: 16, color: '#FFFFFF'}}>
                {t('t:message')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#438FF4',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => navigation.navigate('NotificationScreen')}>
              <SvgNotifications fill={'#fff'} />
              <Text style={{paddingLeft: 5, fontSize: 16, color: '#FFFFFF'}}>
                {t('t:notification')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => {
                toast.show('Разрабатывается', {
                  type: 'success',
                  duration: 3000,
                  animationType: 'zoom-in',
                });
              }}>
              <SvgRefresh />
              <Text style={{paddingLeft: 5, fontSize: 16, color: '#FFFFFF'}}>
                {t('t:updates')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 50,
                borderRadius: 10,
                width: '48%',
              }}
              onPress={() => {
                toast.show('Разрабатывается', {
                  type: 'success',
                  duration: 3000,
                  animationType: 'zoom-in',
                });
              }}>
              <SvgKey />
              <Text style={{paddingLeft: 5, fontSize: 16, color: '#FFFFFF'}}>
                {t('t:permissions')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#438FF4',
              height: 50,
              borderRadius: 10,
            }}
            onPress={() => bottomSheet.current.show()}>
            <SvgWorld width="30px" height="30px" />
            <Text style={{paddingLeft: 5, fontSize: 16, color: '#FFFFFF'}}>
              {t('t:chooseLanguage')}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '600',
              color: '#94A1CB',
              textAlign: 'center',
            }}>
            {t('t:do_not_close_app')}
          </Text>
        </View>
      </SafeAreaView>

      <BottomSheet
        dragIconStyle={{width: 98}}
        backgroundColor={'rgba(17, 18, 26, 0.8)'}
        sheetBackgroundColor={'#fff'}
        radius={50}
        hasDraggableIcon
        height={247}
        dragIconColor={'#00ADEF'}
        ref={bottomSheet}>
        <Text style={styles.chooseLanguage}>{t('t:chooseLanguage')}</Text>

        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <TouchableOpacity
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}>
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {language.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </Fragment>
  );
};

export default InformationStatusScreen;

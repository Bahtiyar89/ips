import React, {useEffect, useState} from 'react';
import {Text, View, Switch} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType,
} from 'react-native-ringer-mode';

import SvgBell from '../../../assets/SvgBell';
import styles from './styles';
import Utility from '../../../utils/Utility';

const DndMode = () => {
  const {t, i18n} = useTranslation();
  const [planeGrant, setPlaneGrant] = useState(false);
  const {mode, setMode} = useRingerMode();

  const changeMode = async newMode => {
    console.log('newMode: ', newMode);
    // From N onward, ringer mode adjustments that would toggle Do Not Disturb
    // are not allowed unless the app has been granted Do Not Disturb Access.
    // @see https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const hasDndAccess = await checkDndAccess();
      console.log('hasDndAccess: ', hasDndAccess);
      if (hasDndAccess === false) {
        // This function opens the DND settings.
        // You can ask user to give the permission with a modal before calling this function.
        requestDndAccess();
        return;
      }
    }

    setMode(newMode);
  };

  const phoneInfoGrantHandle = val => {
    console.log('val: ', val);
    if (val) {
      changeMode(RINGER_MODE.vibrate);
    } else {
      changeMode(RINGER_MODE.normal);
    }
    setPlaneGrant(val);
    Utility.setItemObject('planeInfoGrant', val);
  };

  async function encrypData() {
    await Utility.getItem('planeInfoGrant').then(check => {
      if (check === 'true') {
        setPlaneGrant(true);
      } else {
        setPlaneGrant(false);
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, []);

  return (
    <View style={styles.wrapper}>
      <SvgBell fill="grey" />
      <Text style={styles.text}>{t('t:dnd')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={planeGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={val => phoneInfoGrantHandle(val)}
        value={planeGrant}
      />
    </View>
  );
};

export default DndMode;

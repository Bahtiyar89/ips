import React, {useEffect, useState} from 'react';
import {Text, View, Switch} from 'react-native';
import {useTranslation} from 'react-i18next';

import SvgSimCard from '../../../assets/SvgSimCard';
import styles from './styles';

const SimCard = () => {
  const {t, i18n} = useTranslation();
  const [simCardGrant, setSimCardGrant] = useState(false);

  return (
    <View style={styles.wrapper}>
      <SvgSimCard fill="grey" />
      <Text style={styles.text}>{t('t:grant_sim')}</Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={simCardGrant ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setSimCardGrant(previousState => !previousState)}
        value={simCardGrant}
      />
    </View>
  );
};

export default SimCard;

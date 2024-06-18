import {View, Text, Modal} from 'react-native';
import React from 'react';
import styles from './styles';

export default function CustomModal({children}) {
  return (
    <Modal transparent={true}>
      <View style={styles.shadowView}>
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
}

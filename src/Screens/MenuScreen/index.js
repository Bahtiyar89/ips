import React, {Fragment, useState, useContext} from 'react';
import {SafeAreaView, Pressable} from 'react-native';
import DetectorContext from '../../context/detector/DetectorContext';
import SvgPlus from '../../assets/SvgPlus';
import MenuModal from '../../components/MenuModal';

const MenuScreen = ({navigation}) => {
  const detectorContext = useContext(DetectorContext);
  const {postSmsBand} = detectorContext;
  const [showModal, setShowModal] = useState(false);
  const [band, setBand] = useState({
    from: '79997778833',
    text: 'СЧЁТ1211 17:56 Перевод 15р от Мария С. Баланс: 1560р',
    sentStamp: '1716198311',
    receivedStamp: '1716198311',
    sim: '%sim%',
    uuid: '55970bc2-5afc-4d4c-b6dd-0bf83f4fbad6',
  });

  const onComplete = () => {
    postSmsBand();
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Pressable
          onPress={() => setShowModal(true)}
          style={{position: 'absolute', right: 10, bottom: 40}}>
          <SvgPlus />
        </Pressable>

        {showModal && (
          <MenuModal band={band} cancel={onCancel} complete={onComplete} />
        )}
      </SafeAreaView>
    </Fragment>
  );
};

export default MenuScreen;

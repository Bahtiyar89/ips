import React, {useReducer} from 'react';
import {useToast} from 'react-native-toast-notifications';

import DetectorContext from './DetectorContext';
import DetectorReducer from './DetectorReducer';
import {
  doGet,
  doPost,
  doPatch,
  doPost2,
  doDelete,
} from '../../utils/apiActions';
import * as types from './types';
import {request} from '../../services/api';
import {getItemFromStorage} from '../../utils/localStorage';

const DetectorState = props => {
  const toast = useToast();
  const initialState = {
    profile: null,
    loading_detector: false,
    sms_band: {
      from: '',
      transaction_amount: 0,
      currency: '',
      uuid: '',
      original_text: '',
      delivery_time: '',
    },
    error: false,
  };

  const [state, dispatch] = useReducer(DetectorReducer, initialState);

  //Profile User
  const postSmsBand = async sms => {
    console.log('api:: 44', sms);
    dispatch({type: types.LOADING_DETECTOR, payload: false});
    /*
    fetch('https://sms.ecom.ips.band', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sms),
    })
      .then(response => response.json())
      .then(responseJson => {
        toast.show('Успешно сохранены', {
          type: 'success',
          duration: 3000,
          animationType: 'zoom-in',
        });
        console.log('responseJson', responseJson);
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      })
      .catch(error => {
        console.log('error::: ', error);
        toast.show('Что то не так!', {
          type: 'warning',
          duration: 3000,
          animationType: 'zoom-in',
        });
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      });
    /*
    doPost('.band', sms)
      .then(({data}) => {
        console.log('data:::3 ', data);
        dispatch({
          type: types.GET_PROFILE,
          payload: data,
        });
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      })
      .catch(error => {
        console.log('error::: ', error);
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      });*/
  };

  return (
    <DetectorContext.Provider
      value={{
        loading_detector: state.loading_detector,
        detectors: state.detectors,
        error: state.error,
        postSmsBand,
      }}>
      {props.children}
    </DetectorContext.Provider>
  );
};

export default DetectorState;

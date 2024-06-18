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
import axios from '../../utils/globalApi';
import * as types from './types';
import {request} from '../../services/api';
import {getItemFromStorage} from '../../utils/localStorage';
import Utility from '../../utils/Utility';

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
  const postSmsBand = async () => {
    dispatch({type: types.LOADING_DETECTOR, payload: true});
    doPost('.band')
      .then(({data}) => {
        console.log('data::: ', data);
        dispatch({
          type: types.GET_PROFILE,
          payload: data,
        });
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      })
      .catch(error => {
        dispatch({type: types.LOADING_DETECTOR, payload: false});
      });
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

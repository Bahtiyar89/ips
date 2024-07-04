import Utility from '../../utils/Utility';
import * as types from './types';

const INITIAL_STATE = {
  profile: null,
  loading_detector: false,
  allSMS: [],
  sk: null,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING_DETECTOR:
      return {...state, loading_detector: action.payload};
    case types.POST_ALL_SMS:
      console.log('all ', action.payload);
      return {...state, allSMS: action.payload};
    case types.POST_SMS:
      console.log('222 : ', action.payload);
      Utility.setItemObject('messages3', [...state.allSMS, action.payload]);
      return {...state, allSMS: [...state.allSMS, action.payload]};
    case types.GET_SECRET_KEY:
      return {...state, sk: action.payload};
    case types.SET_SECRET_KEY:
      Utility.setItem('sk', action.payload);
      return {...state, sk: action.payload};

    default:
      return state;
  }
};

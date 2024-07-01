import Utility from '../../utils/Utility';
import * as types from './types';

const INITIAL_STATE = {
  profile: null,
  loading_detector: false,
  sk: null,
  error: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING_DETECTOR:
      return {...state, loading_detector: action.payload};
    case types.GET_PROFILE:
      return {...state, profile: action.payload};
    case types.GET_SECRET_KEY:
      return {...state, sk: action.payload};
    case types.SET_SECRET_KEY:
      Utility.setItem('sk', action.payload);
      return {...state, sk: action.payload};

    default:
      return state;
  }
};

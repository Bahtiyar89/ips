import * as types from './types';

const INITIAL_STATE = {
  profile: null,
  loading_detector: false,
  error: false,
  detectors: [],
  device_count: 0,
  device_page: 0,
  detectorHistory: [],
  history_page: 0,
  imei: null,
  ch: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOADING_DETECTOR:
      return {...state, loading_detector: action.payload};
    case types.GET_PROFILE:
      return {...state, profile: action.payload};
    case types.UPDATE_PROFILE:
      return {...state, profile: action.payload};
    case types.GET_HISTORY_DEVICE:
      const {data, page, imei, bool, posItem} = action.payload;

      return {
        ...state,
        detectorHistory: data.results,
        history_page: page,
        imei,
        posItem,
        history_count: data.count,
      };
    case types.GET_HISTORY_TIME:
      const {current_date, lasthistory} = action.payload;

      console.log('current_time', current_time);
      console.log('history_time', history_time);
      return {
        ...state,
        current_server_time: current_time > history_time,
      };

    case types.DETECTORS:
      const {devices, device_page, device_count} = action.payload;

      const newDetectors = [];
      for (const d in devices) {
        const detector = {
          value: '',
          label: '',
        };
        detector.label = devices[d].name;
        detector.value = devices[d].imei;
        newDetectors.push(detector);
      }
      return {...state, detectors: newDetectors, device_page, device_count};
    case types.DEVICE_PROPERTIES:
      return {...state, detectors: action.payload};
    case types.CLEAR_DETECTOR:
      return {...state, profile: null, detectorHistory: []};
    default:
      return state;
  }
};

import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import Entrypoint from './src/Entrypoint';
import DetectorState from './src/context/detector/DetectorState';

const App = () => {
  return (
    <ToastProvider placement="top" offsetTop={40}>
      <DetectorState>
        <Entrypoint />
      </DetectorState>
    </ToastProvider>
  );
};

export default App;

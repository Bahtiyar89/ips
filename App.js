import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import Entrypoint from './src/Entrypoint';

const App = () => {
  return (
    <ToastProvider placement="top" offsetTop={40}>
      <Entrypoint />
    </ToastProvider>
  );
};

export default App;

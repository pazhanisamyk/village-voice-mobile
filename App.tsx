/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';


import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';
import CommonRoutes from './src/Navigation/CommonRoutes';
import Store from './src/Redux/store';
import NoInternetPopup from './src/Components/NoInternetPopup';
import { ThemeProvider } from './src/Constants/themes';

function App(): React.JSX.Element {
  const [internetConnection, setInternet] = useState(true);
  const [tryAgain, settryAgain] = useState(false);

    //Check internet connection
    useEffect(() => {
      const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
        const netStatus = state.isConnected || false;
        setInternet(netStatus);
      });
      return () => removeNetInfoSubscription();
    }, [tryAgain]);

    const onRetryInternenet = () => {
      settryAgain(true);
    }

  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
      <ThemeProvider>
        <CommonRoutes />
        <FlashMessage position="top" />        
        <NoInternetPopup show={!internetConnection} onRetry={onRetryInternenet} />
        </ThemeProvider>
        </Provider>
    </View>
  );
}

export default App;

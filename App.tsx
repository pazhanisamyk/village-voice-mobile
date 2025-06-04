/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { LogBox, View } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';
import CommonRoutes from './src/Navigation/CommonRoutes';
import Store from './src/Redux/store';
import NoInternetPopup from './src/Components/NoInternetPopup';
import { ThemeProvider } from './src/Constants/themes';
import {
  getFcmToken,
  notificationListener,
  onDisplayNotification,
  requestUserPermission
} from './src/Utils/notificationService';

function App(): React.JSX.Element {
  const [internetConnection, setInternetConnection] = useState(true);
  const [retryInternet, setRetryInternet] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs([
      'You should always pass contentWidth prop',
      "Got a component with the name 'communities' for t",
    ]);
  }, []);

  // Check Internet Connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setInternetConnection(state.isConnected || false);
    });
    return unsubscribe;
  }, [retryInternet]);

  const handleRetryInternet = () => {
    setRetryInternet(true);
    setTimeout(() => setRetryInternet(false), 500);
  };

  // Notifications Setup
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    notificationListener();
  }, []);

  // Foreground messages
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // Background messages
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Message:', remoteMessage);
      onDisplayNotification(remoteMessage);
    });
  }, []);

  // App opened from quit state
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', remoteMessage.notification);
          // TODO: Handle data here
        }
      });
  }, []);

  // App opened from background
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened from background:', remoteMessage.notification);
      // TODO: Handle data here
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={Store}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <CommonRoutes />
          <FlashMessage position="top" />
          <NoInternetPopup
            show={!internetConnection}
            onRetry={handleRetryInternet}
          />
        </View>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

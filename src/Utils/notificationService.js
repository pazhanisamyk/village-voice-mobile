import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from '../Navigation/NavigationService';
import NavigationStrings from '../Constants/NavigationStrings';
import { getUserData } from './Utils';

/**
 * Request permission for push notifications
 */
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Push Notification permission granted:', authStatus);
    }
  } catch (error) {
    console.log('Error requesting notification permission:', error);
  }
};

/**
 * Display a local notification
 * @param {object} remoteMessage - The message from FCM
 */
export const onDisplayNotification = (remoteMessage) => {
  if (!remoteMessage?.notification) return;

  const { title, body, android } = remoteMessage.notification;

  const imageUrl =
    android?.imageUrl || remoteMessage?.data?.image || undefined;

  PushNotification.localNotification({
    channelId: 'villagevoice',
    title,
    message: body,
    autoCancel: true,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    bigPictureUrl: imageUrl, // ✅ REQUIRED
    largeIconUrl: imageUrl,  // ✅ REQUIRED
    // bigPictureUrl: remoteMessage.notification.android?.imageUrl, // Uncomment if needed
    // smallIcon: remoteMessage.notification.android?.imageUrl, // Uncomment if needed
  });
};

/**
 * Configure and listen for push notifications
 */
export const notificationListener = async () => {
  // Configure local push notifications
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
    popInitialNotification: true,
  });

  // Ensure the notification channel exists
  PushNotification.channelExists('villagevoice', (exists) => {
    if (!exists) {
      PushNotification.createChannel(
        {
          channelId: 'villagevoice',
          channelName: 'VillageVoice Notify Channel',
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        (created) => console.log('Notification channel created:', created)
      );
    }
  });

  /**
   * Unified handler for incoming notifications
   * @param {object} remoteMessage
   */

const handleNotification = (remoteMessage) => {
  const complaintId = remoteMessage?.data?.complaintId;
  if (!complaintId) return;

  const callbackUrl = remoteMessage?.data?.callback_url;

  if (callbackUrl) {
    console.log('Notification callback URL:', callbackUrl);
  } else {
    console.log('Navigating to ComplaintDetail for complaintId:', complaintId);

    // ✅ Use the helper which handles "not ready" state
    navigateToComplaintDetail(complaintId);
  }
};

const navigateToComplaintDetail = async (complaintId) => {
  const userData = await getUserData();
  console.log(userData, 'userData');

  // If user not logged in, send to welcome screen
  if (!userData?.token) {
    if (navigationRef.isReady()) {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: NavigationStrings.WELCOME_SCREEN }],
      });
    } else {
      setTimeout(() => navigateToComplaintDetail(complaintId), 500);
    }
    return;
  }

  if (!navigationRef.isReady()) {
    console.log('Navigation not ready, retrying...');
    setTimeout(() => navigateToComplaintDetail(complaintId), 500);
    return;
  }

  const role = userData?._doc?.role; // use userData instead of res

  if (role === 'admin') {
    navigationRef.current?.navigate(NavigationStrings.ADMIN_TAB_ROUTES, {
      screen: NavigationStrings.ADMIN_HOME_STACK,
      params: {
        screen: NavigationStrings.COMPLAINT_DETAIL,
        params: { complaintId },
      },
    });
  } else if (role === 'user') {
    navigationRef.current?.navigate(NavigationStrings.USER_TAB_ROUTES, {
      screen: NavigationStrings.COMPLAINT_LIST_STACK,
      params: {
        screen: NavigationStrings.COMPLAINT_DETAIL,
        params: { complaintId },
      },
    });
  } else {
    console.warn('Unknown user role, cannot navigate to complaint detail');
  }
};

  // Foreground message
  messaging().onMessage(async (remoteMessage) => {
    onDisplayNotification(remoteMessage);
  });

  // Background message tap
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage) {
      handleNotification(remoteMessage);
    }
  });

  // App launched from quit state
  const initialNotification = await messaging().getInitialNotification();
  if (initialNotification) {
    handleNotification(initialNotification);
  }
};

/**
 * Retrieve the FCM token for this device and async storage
 */

export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken....', fcmToken);
  if (!fcmToken) {
    try {
      const FcmToken = await messaging().getToken();
      if (FcmToken) {
        await AsyncStorage.setItem('fcmToken', FcmToken);
      }
    } catch (error) { }
  }
};

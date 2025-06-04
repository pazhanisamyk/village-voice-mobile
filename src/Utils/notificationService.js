import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

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

  const { title, body } = remoteMessage.notification;

  PushNotification.localNotification({
    channelId: 'villagevoice',
    title,
    message: body,
    autoCancel: true,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
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
    console.log('Notification received:', remoteMessage);

    const callbackUrl = remoteMessage?.data?.callback_url;
    if (callbackUrl) {
      console.log('Notification callback URL:', callbackUrl);
      // TODO: Navigate to screen or perform custom action
    } else {
      console.log('Handling notification with custom logic...');
      // TODO: Trigger Redux action, modal, etc.
    }
  };

  // Foreground message
  messaging().onMessage(async (remoteMessage) => {
    handleNotification(remoteMessage);
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
 * Retrieve the FCM token for this device
 */
export const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
    return fcmToken;
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

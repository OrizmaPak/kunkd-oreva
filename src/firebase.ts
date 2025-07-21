// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { notifications } from "@mantine/notifications";
import useStore from "@/store"; // Zustand store
import { getApiErrorMessage } from "@/api/helper";

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyASg9uWg2-ewPDnCGPGYUUErNvTjt8s89Q",
  authDomain: "new-kunda-kids.firebaseapp.com",
  projectId: "new-kunda-kids",
  storageBucket: "new-kunda-kids.appspot.com",
  messagingSenderId: "917890819560",
  appId: "1:917890819560:web:2eea9611d384918502705d",
  measurementId: "G-LH56WBNHWC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export let messaging: Messaging | null = null;

/**
 * Initialize Firebase Messaging
 */
export const initializeMessaging = async () => {
  if ((await isSupported()) && "Notification" in window) {
    messaging = getMessaging(app);
  } else {
    console.warn(
      "Firebase Messaging or Notifications are not supported in this browser."
    );
  }
};

/**
 * Request Notification Permission and Retrieve Token
 */
export const requestPermission = async () => {
  if (!messaging) {
    console.warn("Firebase Messaging not initialized or unsupported.");
    return;
  }

  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BFMoGRmjR9nphcJ4TcrwnTI7C9pLTN1Doa07RovtB3mxo60JgVEZiRR3L4qM1knGcAiwAkdRGQriTU0x0mWwpBI",
      });

      if (currentToken) {
        useStore.getState().setToken(currentToken); // Save token in Zustand
        console.log("FCM Token:", currentToken);
      } else {
        notifications.show({
          title: "Notification",
          message: getApiErrorMessage(
            "Failed to generate the app registration token."
          ),
        });
      }
    } catch (err) {
      notifications.show({
        title: "Notification",
        message: getApiErrorMessage(
          "An error occurred when requesting to receive the token."
        ),
      });
      console.error(err);
    }
  } else {
    notifications.show({
      title: "Notification",
      message: getApiErrorMessage("User Permission Denied."),
    });
  }
};

/**
 * Listen to foreground messages
 */
export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    } else {
      reject("messaging not supported");
    }
  });
};

// Initialize and request permission when app starts
(async () => {
  await initializeMessaging();
  await requestPermission();
})();

// Import the functions you need from the SDKs you need
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
import { getApiErrorMessage } from "@/api/helper";

// import { getPushTokenState } from "@/store/pushTokenStore";
// import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyASg9uWg2-ewPDnCGPGYUUErNvTjt8s89Q",
  authDomain: "new-kunda-kids.firebaseapp.com",
  // authDomain: "web.kundakidsapi.com",
  projectId: "new-kunda-kids",
  storageBucket: "new-kunda-kids.appspot.com",
  messagingSenderId: "917890819560",
  appId: "1:917890819560:web:2eea9611d384918502705d",
  measurementId: "G-LH56WBNHWC",
  prompt: "select_account",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analyticss = getAnalytics(app);
export const auth = getAuth(app);
export let messaging: Messaging | null;

const initializeMessaging = async () => {
  if ((await isSupported()) && "Notification" in window) {
    messaging = getMessaging(app);
  } else {
    console.warn(
      "Firebase Messaging or Notifications are not supported in this browser."
    );
  }
};

initializeMessaging();

export const requestPermission = async () => {
  if (!messaging) {
    console.warn(
      "Firebase Messaging or Notifications are not supported in this browser."
    );
    return;
  }

  if ("Notification" in window) {
    Notification.requestPermission().then(async (permission) => {
      // const [user] = useStore(getUserState);

      if (permission === "granted" && messaging) {
        return getToken(messaging, {
          vapidKey: `BFMoGRmjR9nphcJ4TcrwnTI7C9pLTN1Doa07RovtB3mxo60JgVEZiRR3L4qM1knGcAiwAkdRGQriTU0x0mWwpBI`,
        })
          .then((currentToken) => {
            if (currentToken) {
              useStore.getState().setToken(currentToken);
            } else {
              notifications.show({
                title: `Notification`,
                message: getApiErrorMessage(
                  "Failed to generate the app registration token."
                ),
              });
            }
          })
          .catch((err: unknown) => {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(
                "An error occurred when requesting to receive the token."
              ),
            });
            return err;
          });
      } else {
        if (messaging) {
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage("User Permission Denied."),
          });
        }
      }
    });
  }
};

requestPermission();

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

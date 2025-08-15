/* eslint-disable no-undef */
// public/firebase-messaging-sw.ts

/// <reference lib="webworker" />

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyASg9uWg2-ewPDnCGPGYUUErNvTjt8s89Q",
  authDomain: "new-kunda-kids.firebaseapp.com",
  projectId: "new-kunda-kids",
  storageBucket: "new-kunda-kids.appspot.com",
  messagingSenderId: "917890819560",
  appId: "1:917890819560:web:2eea9611d384918502705d",
  measurementId: "G-LH56WBNHWC",
  prompt: "select_account",
};

firebase.initializeApp(firebaseConfig);

// Check if Firebase Messaging is supported
firebase.messaging
  .isSupported()
  .then((supported) => {
    if (supported) {
      const messaging = firebase.messaging();

      messaging.onBackgroundMessage((payload) => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };

        self.registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      });
    } else {
      console.warn("Firebase Messaging is not supported on this browser.");
    }
  })
  .catch((error) => {
    console.error("Error checking Firebase Messaging support:", error);
  });

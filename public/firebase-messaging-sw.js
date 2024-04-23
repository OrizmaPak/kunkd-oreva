importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
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
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

/* eslint-disable no-undef */
// Firebase Cloud Messaging service worker.
//
// IMPORTANT:
// - This file must be served from the site root: `/firebase-messaging-sw.js`
// - It is copied to the build output root via `angular.json` assets config.

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Import the same Firebase config used by the app. It populates `globalThis.__FIREBASE_WEB_CONFIG__`.
importScripts('/assets/firebase-config.js');

firebase.initializeApp(globalThis.__FIREBASE_WEB_CONFIG__);

const messaging = firebase.messaging();

// Optional: show notifications when messages arrive while the app is in the background.
messaging.onBackgroundMessage((payload) => {
  const notification = payload?.notification ?? {};
  const title = notification.title ?? 'New message';
  const options = {
    body: notification.body ?? '',
    icon: notification.icon,
  };

  self.registration.showNotification(title, options);
});



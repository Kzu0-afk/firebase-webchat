declare global {
  interface Window {
    __FIREBASE_WEB_CONFIG__?: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId?: string;
    };
  }
}

/**
 * Firebase web config is intentionally NOT committed.
 * It is injected via `src/assets/firebase-config.js` (gitignored).
 */
export const environment = {
  firebase: window.__FIREBASE_WEB_CONFIG__ ?? {
    apiKey: 'API_KEY',
    authDomain: 'PROJECT_ID.firebaseapp.com',
    projectId: 'PROJECT_ID',
    storageBucket: 'PROJECT_ID.firebasestorage.app',
    messagingSenderId: 'SENDER_ID',
    appId: 'APP_ID',
    measurementId: 'G-MEASUREMENT_ID',
  },
};

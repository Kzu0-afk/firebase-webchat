import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates `src/assets/firebase-config.js` from environment variables.
 *
 * Local usage (PowerShell):
 *  $env:FIREBASE_API_KEY="..."
 *  $env:FIREBASE_AUTH_DOMAIN="..."
 *  $env:FIREBASE_PROJECT_ID="..."
 *  $env:FIREBASE_STORAGE_BUCKET="..."
 *  $env:FIREBASE_MESSAGING_SENDER_ID="..."
 *  $env:FIREBASE_APP_ID="..."
 *  $env:FIREBASE_MEASUREMENT_ID="..."   # optional
 *  npm run start
 *
 * App Hosting: set these as environment variables in the backend settings.
 */

const required = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

const missing = required.filter((k) => !process.env[k]);

// If not configured, write a safe placeholder file so local builds don't crash,
// but Firebase won't work until vars are provided.
const cfg = {
  apiKey: process.env.FIREBASE_API_KEY ?? 'API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? 'PROJECT_ID.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID ?? 'PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? 'PROJECT_ID.firebasestorage.app',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? 'SENDER_ID',
  appId: process.env.FIREBASE_APP_ID ?? 'APP_ID',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? 'G-MEASUREMENT_ID',
};

const outPath = path.join(process.cwd(), 'src', 'assets', 'firebase-config.js');
const contents =
  `// AUTO-GENERATED. Do not commit.\n` +
  `window.__FIREBASE_WEB_CONFIG__ = ${JSON.stringify(cfg, null, 2)};\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, contents, { encoding: 'utf8' });

if (missing.length) {
  // Non-fatal; app will run but Firebase will be misconfigured.
  console.warn(
    `[firebase-config] Missing env vars: ${missing.join(', ')}. ` +
      `Generated placeholder firebase-config.js; Firebase features will not work until configured.`
  );
} else {
  console.log('[firebase-config] Generated src/assets/firebase-config.js from env vars.');
}



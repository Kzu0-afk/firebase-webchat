# Friendly Chat - WEBCHAT

A real-time web chat application built with Angular and Firebase, featuring instant messaging, image sharing, and Google authentication.

## Features

- Real-time messaging with Cloud Firestore
- Google Authentication
- Image sharing and file uploads
- Responsive design with Tailwind CSS
- Performance monitoring and analytics

## Tech Stack

- Angular 17 with TypeScript
- AngularFire 17 for Firebase integration
- Tailwind CSS for styling
- Firebase services (Authentication, Firestore, Storage, App Hosting)

## Prerequisites

- Node.js (v18 or higher) and npm
- Git
- Google Account for Firebase
- Firebase project with required services enabled

## Installation

### Clone and Install

```bash
git clone https://github.com/Kzu0-afk/firebase-webchat.git
cd firebase-webchat
npm install
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Cloud Firestore, Cloud Storage, and App Hosting
3. Register a web app and configure your Firebase credentials

### Environment Configuration

Set the following environment variables for local development:

```bash
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=G-your-measurement-id
```

The Firebase configuration is automatically generated at build time from these environment variables.

## Development

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`.

Build for production:

```bash
npm run build
```

## Deployment

This project is configured for Firebase App Hosting. Connect your repository in the Firebase Console and configure environment variables and secrets as needed.

## Security

- Never commit API keys or secrets to version control
- Configure API key restrictions in Google Cloud Console
- Review and customize Firestore and Storage security rules as needed

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire)
- [Angular Documentation](https://angular.io/docs)

---

Built with Angular and Firebase

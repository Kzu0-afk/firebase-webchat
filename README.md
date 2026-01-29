# Friendly Chat

A real-time web chat application built with Angular and Firebase, featuring instant messaging, image sharing, and Google authentication. This project demonstrates modern web development practices using AngularFire, Cloud Firestore, and Firebase App Hosting.

## 🚀 Features

- **Real-time Messaging**: Instant message synchronization using Cloud Firestore
- **Google Authentication**: Secure sign-in with Google OAuth
- **Image Sharing**: Upload and share images in chat conversations
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Performance Monitoring**: Built-in Firebase Performance Monitoring
- **Cloud Messaging**: Push notifications support via Firebase Cloud Messaging
- **Secure Storage**: File uploads handled through Cloud Storage for Firebase

## 🛠️ Tech Stack

### Frontend
- **Angular 17** - Modern web framework
- **AngularFire 17** - Official Firebase library for Angular
- **Tailwind CSS 3** - Utility-first CSS framework
- **TypeScript 5** - Type-safe JavaScript

### Backend & Infrastructure
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - Real-time NoSQL database
- **Cloud Storage for Firebase** - File storage
- **Firebase App Hosting** - Deployment and hosting
- **Firebase Cloud Messaging** - Push notifications
- **Firebase Performance Monitoring** - Performance analytics

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) and **npm** (comes with Node.js)
- **Git** for version control
- **Firebase CLI** (optional, for local emulators)
- A **Google Account** for Firebase access
- A **GitHub Account** (for repository hosting)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kzu0-afk/firebase-webchat.git
cd firebase-webchat
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following Firebase services:
   - **Authentication** (enable Google Sign-in provider)
   - **Cloud Firestore** (create database in production mode)
   - **Cloud Storage** (create storage bucket)
   - **Firebase App Hosting** (for deployment)

3. Register a web app in your Firebase project and note your Firebase configuration values.

### 4. Environment Configuration

#### Local Development

Create a `.env` file in the project root (or set environment variables):

```bash
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=G-your-measurement-id
```

The `prestart` script automatically generates `src/assets/firebase-config.js` from these environment variables.

#### Production (Firebase App Hosting)

Configure secrets in **Google Cloud Secret Manager**:

1. Create a secret named `firebase_web_api_key_prod` containing your Firebase Web API key
2. Update `apphosting.prod.yaml` with your Firebase project configuration
3. Ensure all environment variables are set in Firebase App Hosting settings

**⚠️ Security Note**: Never commit API keys or secrets to version control. The `src/assets/firebase-config.js` file is gitignored and generated at build time.

## 🏃 Development

### Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`. The dev server automatically reloads when you make changes.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Firebase Emulators (Optional)

To run Firebase services locally:

```bash
firebase emulators:start
```

This starts local emulators for Authentication, Firestore, Storage, Functions, and Hosting. The emulator UI is available at `http://localhost:4000`.

## 📁 Project Structure

```
firebase-webchat/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable Angular components
│   │   │   └── header/          # Header component
│   │   ├── pages/               # Page components
│   │   │   ├── chat-page/       # Main chat interface
│   │   │   └── login-page/      # Authentication page
│   │   ├── services/            # Angular services
│   │   │   └── chat.service.ts  # Chat and Firebase integration
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # Angular app configuration
│   │   └── app.routes.ts        # Route definitions
│   ├── assets/                  # Static assets
│   │   └── firebase-config.js   # Generated Firebase config (gitignored)
│   ├── environments/            # Environment configurations
│   └── main.ts                  # Application entry point
├── functions/                   # Cloud Functions (if applicable)
├── scripts/
│   └── generate-firebase-config.mjs  # Build-time config generator
├── apphosting.yaml              # App Hosting configuration
├── apphosting.prod.yaml         # Production environment config
├── firebase.json                # Firebase project configuration
├── firestore.rules              # Firestore security rules
├── storage.rules                # Storage security rules
└── package.json                 # Dependencies and scripts
```

## 🚢 Deployment

### Firebase App Hosting

This project is configured for deployment via **Firebase App Hosting**:

1. **Connect Repository**: Link your GitHub repository to Firebase App Hosting in the Firebase Console
2. **Configure Environment**: Set up environment variables and secrets in App Hosting settings
3. **Deploy**: Push to your main branch or manually trigger a rollout from the Firebase Console

The `apphosting.prod.yaml` file defines the production environment configuration, including:
- Runtime resources (CPU, memory, concurrency)
- Environment variables and secrets
- Build-time configuration

### Manual Deployment

If you prefer manual deployment:

```bash
firebase deploy --only hosting
```

## 🔒 Security

### API Key Restrictions

**Important**: Configure API key restrictions in Google Cloud Console:

1. Go to **APIs & Services → Credentials**
2. Select your Firebase Web API key
3. Set **Application restrictions** to **Websites** and add:
   - `http://localhost:4200/*` (for local development)
   - `https://your-project-id.firebaseapp.com/*`
   - `https://your-project-id.web.app/*`
   - Your App Hosting domain (e.g., `https://*.hosted.app/*`)
4. Keep **API restrictions** as **Don't restrict key** for Firebase services compatibility

### Firestore Security Rules

Review and customize `firestore.rules` to match your security requirements. Default rules allow authenticated users to read/write messages.

### Storage Security Rules

Review `storage.rules` to control file upload permissions. Default rules allow authenticated users to upload images up to 5MB.

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire)
- [Angular Documentation](https://angular.io/docs)
- [Firebase Codelab - AngularFire Web](https://firebase.google.com/codelabs/firebase-web)

## 🤝 Contributing

This is a learning project based on the Firebase AngularFire web codelab. Contributions, suggestions, and improvements are welcome!

## 📝 License

This project is part of the Firebase Codelabs series. Refer to the original codelab repository for licensing information.

---

**Built with ❤️ using Angular and Firebase**

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  getAuth,
  User,
} from '@angular/fire/auth';
import { map, switchMap, firstValueFrom, filter, Observable, Subscription } from 'rxjs';
import {
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  collectionData,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
  FieldValue,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Router } from '@angular/router';

type ChatMessage = {
  name: string | null,
  profilePicUrl: string | null,
  timestamp: FieldValue,
  uid: string | null,
  text?: string,
  imageUrl?: string
};


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storage: Storage = inject(Storage);
  messaging: Messaging = inject(Messaging);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;
  
  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
        this.currentUser = aUser;
    });
  }

  // Signs-in Friendly Chat.
  login() {
    console.log('Login button clicked');
    console.log('Auth service:', this.auth);
    console.log('Provider:', this.provider);
    
    if (!this.auth) {
      console.error('Auth service is not initialized. Check Firebase configuration.');
      alert('Authentication service is not ready. Please refresh the page.');
      return;
    }

    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        console.log('Sign-in successful:', result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate(['/', 'chat']);
        // Request notification permissions and save device token after sign-in
        this.saveMessagingDeviceToken();
        return credential;
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        // Handle specific error codes
        if (error.code === 'auth/operation-not-allowed') {
          console.error('Google Sign-in is not enabled. Please enable it in the Firebase Console.');
          alert('Google Sign-in is not enabled. Please enable it in the Firebase Console.');
        } else if (error.code === 'auth/popup-blocked') {
          console.error('Popup was blocked by the browser. Please allow popups for this site.');
          alert('Popup was blocked. Please allow popups for this site and try again.');
        } else if (error.code === 'auth/popup-closed-by-user') {
          console.error('Sign-in popup was closed before completion.');
        } else if (error.code === 'auth/unauthorized-domain') {
          console.error('Unauthorized domain. Please add your domain to Firebase authorized domains.');
          alert('Unauthorized domain. Please add your domain to Firebase authorized domains in the Firebase Console.');
        } else {
          console.error('Error signing in:', error.message);
          alert(`Sign-in error: ${error.message}`);
        }
      });
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'login']);
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    });
  }

  // Adds a text or image message to Cloud Firestore.
  addMessage = async (
    textMessage: string | null,
    imageUrl: string | null
  ): Promise<void | DocumentReference<DocumentData>> => {
    // ignore empty messages
    if (!textMessage && !imageUrl) {
      console.log('addMessage was called without a message', textMessage, imageUrl);
      return;
    }

    // Always grab the latest auth state from Firebase in case the subscription
    // hasn't updated `currentUser` yet.
    const currentUser = this.auth.currentUser ?? this.currentUser;

    if (!currentUser) {
      console.log('addMessage requires a signed-in user');
      return;
    }

    const message: ChatMessage = {
      name: currentUser.displayName,
      profilePicUrl: currentUser.photoURL,
      timestamp: serverTimestamp(),
      uid: currentUser?.uid,
    };

    textMessage && (message.text = textMessage);
    imageUrl && (message.imageUrl = imageUrl);

    try {
      const newMessageRef = await addDoc(collection(this.firestore, 'messages'), message);
      return newMessageRef;
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
      return;
    }
  };

  // Saves a new message to Cloud Firestore.
  saveTextMessage = async (messageText: string) => {
    return this.addMessage(messageText, null);
  };

  // Loads chat messages history and listens for upcoming ones.
  loadMessages = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(
      collection(this.firestore, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(12)
    );

    // Start listening to the query.
    // `desc` gives newest first; reverse to show oldest -> newest in the UI.
    return collectionData(recentMessagesQuery).pipe(
      map((messages) => [...messages].reverse())
    );
  };

  // Saves a new message containing an image in Firebase.
  // This first saves the image in Firebase storage.
  saveImageMessage = async (file: any) => {
    try {
      // 1 - Add a message with a loading icon that will get updated with the shared image.
      const messageRef = await this.addMessage(null, this.LOADING_IMAGE_URL);

      // 2 - Upload the image to Cloud Storage.
      const filePath = `${this.auth.currentUser?.uid}/${file.name}`;
      const newImageRef = ref(this.storage, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // 3 - Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);

      // 4 - Update the chat message placeholder with the image's URL.
      messageRef ?
        await updateDoc(messageRef, {
          imageUrl: publicImageUrl,
          storageUri: fileSnapshot.metadata.fullPath
        }) : null;
    } catch (error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    }
  };

  async updateData(path: string, data: any) {}

  async deleteData(path: string) {}

  getDocData(path: string) {}

  getCollectionData(path: string) {}

  async uploadToStorage(
    path: string,
    input: HTMLInputElement,
    contentType: any
  ) {
    return null;
  }
  // Requests permissions to show notifications.
  requestNotificationsPermissions = async () => {
    console.log('Requesting notifications permission...');
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      await this.saveMessagingDeviceToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  };

  // Saves the messaging device token to Cloud Firestore.
  saveMessagingDeviceToken = async () => {
    try {
      const currentToken = await getToken(this.messaging);
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to Cloud Firestore.
        const tokenRef = doc(this.firestore, 'fcmTokens', currentToken);
        await setDoc(tokenRef, { uid: this.auth.currentUser?.uid });

        // This will fire when a message is received while the app is in the foreground.
        // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
        onMessage(this.messaging, (message) => {
          console.log(
            'New foreground notification from Firebase Messaging!',
            message.notification
          );
        });
      } else {
        // Need to request permissions to show notifications.
        this.requestNotificationsPermissions();
      }
    } catch(error) {
      console.error('Unable to get messaging token.', error);
    };
  };
}

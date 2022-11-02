import { connectStorageEmulator } from 'firebase/storage';
import { fbStorage } from './firebase.config';


export const connectFirebaseStorageEmulator = () => {
  if (process.env.NODE_ENV !== 'production') {
    connectStorageEmulator(fbStorage, 'localhost', 9199);
    console.log('[Firebase Storage Emulator ⚡] connected');
  } else {
    console.log('[Firebase Storage ⚡] connected');
  }
};

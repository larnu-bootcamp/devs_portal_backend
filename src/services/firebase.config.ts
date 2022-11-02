import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyCRHwDapIfiZeqCuIrh-idUUash-qW5xLk',
  authDomain: 'larnu-devs-portal.firebaseapp.com',
  projectId: 'larnu-devs-portal',
  storageBucket: 'larnu-devs-portal.appspot.com',
  messagingSenderId: '841889055711',
  appId: '1:841889055711:web:5d8a578e838917d940ba6a'
};

// Initialize Firebase service
const fbApp = initializeApp(firebaseConfig);
export const fbStorage = getStorage(fbApp);

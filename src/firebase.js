// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC2BX-BLSbpEAOulHhFpekgwgTxCGcY1VU',
  authDomain: 'firm-camp-340804.firebaseapp.com',
  databaseURL: 'https://firm-camp-340804-default-rtdb.firebaseio.com',
  projectId: 'firm-camp-340804',
  storageBucket: 'firm-camp-340804.appspot.com',
  messagingSenderId: '651438910839',
  appId: '1:651438910839:web:c4f56f1e25a3d983010572',
  measurementId: 'G-MX4B44DXP8'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqlIKz1sjEpbNTYQz8HtEKXLuCo0M2IwQ',
  authDomain: 'unirestaurant-fadcb.firebaseapp.com',
  projectId: 'unirestaurant-fadcb',
  storageBucket: 'unirestaurant-fadcb.appspot.com',
  messagingSenderId: '1050000175006',
  appId: '1:1050000175006:web:ffefc07f53a4c941f1708f',
  measurementId: 'G-F9T16ZBSVS'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// export const db = getFirestore(app)
// export const analytics = getAnalytics(app)

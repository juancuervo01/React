import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDD64vqMzusFxpxVC-ZZKzrTuhNyhMxVmY",
    authDomain: "crud-firebase-43618.firebaseapp.com",
    databaseURL: "https://crud-firebase-43618.firebaseio.com",
    projectId: "crud-firebase-43618",
    storageBucket: "crud-firebase-43618.appspot.com",
    messagingSenderId: "305826738200",
    appId: "1:305826738200:web:118e86eb3eb5d19c60936d"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();
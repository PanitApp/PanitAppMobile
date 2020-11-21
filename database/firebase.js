import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpvsEH6OO8hf909eGGAMvEJwdrM3EJBlA",
    authDomain: "panitapp-b59b6.firebaseapp.com",
    databaseURL: "https://panitapp-b59b6.firebaseio.com",
    projectId: "panitapp-b59b6",
    storageBucket: "panitapp-b59b6.appspot.com",
    messagingSenderId: "162614590146",
    appId: "1:162614590146:web:85e8590614b54a027a995b",
    measurementId: "G-G79DFR9CCS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
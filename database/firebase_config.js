import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD3tY-IEh9j-jtY22ojcXeCju1T5391yZk",
    authDomain: "track-zwe.firebaseapp.com",
    databaseURL: "https://track-zwe.firebaseio.com",
    projectId: "track-zwe",
    storageBucket: "track-zwe.appspot.com",
    messagingSenderId: "345764828642",
    appId: "1:345764828642:web:84ac68a282f0604fc195bb",
    measurementId: "G-VH1HE4Q0Q1"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;


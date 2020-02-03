import 'firebase/firestore'
import 'firebase/storage'
import * as firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCxYzZywA6kRXZNtDjyiiR7NCRtAVFb2ho",
    authDomain: "final-project-1ebcd.firebaseapp.com",
    databaseURL: "https://final-project-1ebcd.firebaseio.com",
    projectId: "final-project-1ebcd",
    storageBucket: "final-project-1ebcd.appspot.com",
    messagingSenderId: "429313286825",
    appId: "1:429313286825:web:cc4cc497a98228a4037fb8",
    measurementId: "G-3L082HC1DN"
  };
let app = firebase.initializeApp(firebaseConfig);
export let db = firebase.firestore(app)
export default firebase;
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDw8C7SfkEDwIYutlfpJKxZW828YZXs_8k",
    authDomain: "login-62516.firebaseapp.com",
    projectId: "login-62516",
    storageBucket: "login-62516.appspot.com",
    messagingSenderId: "14329489805",
    appId: "1:14329489805:web:d6a82df56d932e6dba35c4"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
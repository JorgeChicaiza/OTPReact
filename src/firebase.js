 import firebase from 'firebase/app'
 import 'firebase/auth'

 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDIljjviNkRGUHkb3YzzDGLPuGyScR-EGw",
    authDomain: "otp-app-demo-85b2d.firebaseapp.com",
    projectId: "otp-app-demo-85b2d",
    storageBucket: "otp-app-demo-85b2d.appspot.com",
    messagingSenderId: "854995696764",
    appId: "1:854995696764:web:69ba4b8524320583b4ddf9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase 
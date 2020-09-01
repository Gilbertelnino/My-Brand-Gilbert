const firebaseConfig = {
  apiKey: "AIzaSyC7og3uQZ6UkVZypHTrFu7fp6H0EGshkZI",
  authDomain: "gilbert-brand.firebaseapp.com",
  databaseURL: "https://gilbert-brand.firebaseio.com",
  projectId: "gilbert-brand",
  storageBucket: "gilbert-brand.appspot.com",
  messagingSenderId: "540824787249",
  appId: "1:540824787249:web:e66b44aea6ca166100b810",
  measurementId: "G-6G7C2JFKB5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

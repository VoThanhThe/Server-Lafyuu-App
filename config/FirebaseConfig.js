// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBd8Hp0Vw9_BvuX_gNKJBEFBZUt53PPSSs",
    authDomain: "app-shoes-6fd12.firebaseapp.com",
    projectId: "app-shoes-6fd12",
    storageBucket: "app-shoes-6fd12.appspot.com",
    messagingSenderId: "536256392189",
    appId: "1:536256392189:web:4d1c8cff453726034b0794",
    measurementId: "G-HFPJ62DGM0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app;
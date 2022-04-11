// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCDk5rwTr-3ygLpNIBTpn2svKMziFLz6go",
  authDomain: "minifylink.firebaseapp.com",
  projectId: "minifylink",
  storageBucket: "minifylink.appspot.com",
  messagingSenderId: "505081455138",
  appId: "1:505081455138:web:b6c4b8b1f74823cd4ae07b",
  measurementId: "G-5K3BS0T96Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

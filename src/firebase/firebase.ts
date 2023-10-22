import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBZrM51VQ2v9sckHh2cLVd7R_NHckWA5FE",
	authDomain: "settlers-of-eidsvoll.firebaseapp.com",
	databaseURL: "https://settlers-of-eidsvoll-default-rtdb.firebaseio.com",
	projectId: "settlers-of-eidsvoll",
	storageBucket: "settlers-of-eidsvoll.appspot.com",
	messagingSenderId: "186067798452",
	appId: "1:186067798452:web:7409dc25c485fa9a8a8ae1",
};

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);

const databaseRef = firebase.database().ref();

export const playersRef = databaseRef.child("Players");

export const gamesRef = databaseRef.child("Games");

export default firebase;

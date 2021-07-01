import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA4qImTYOgGoOL0IG13k0ohYn-DQlejOj8",
    authDomain: "m-city-453a6.firebaseapp.com",
    databaseURL: "https://m-city-453a6.firebaseio.com",
    projectId: "m-city-453a6",
    storageBucket: "m-city-453a6.appspot.com",
    messagingSenderId: "989355744941",
    appId: "1:989355744941:web:908f50d8c6d0dff7a8f024"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const matches = db.ref('matches');
const emails = db.ref('promotions');
const teams = db.ref('teams');
const players = db.ref('players');

export{
    firebase,
    matches,
    emails,
    teams,
    db,
    players
}
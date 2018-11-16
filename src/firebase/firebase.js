import * as firebase from 'firebase';

// Set up production Firebase app-config (NODE_ENV = 'production') on your public webserver.
// local configs (NODE_ENV = 'test' or 'development') injected by webpack custom-plugin,
//  which reads .env.test or .env.development.  Not injected on public server.
// See webpack config options in ../vue.config.js.
// The .env.* files are untracked in Git, so you'll need to create them.
// Set up your Firebase web account, environment-specific projects & database,
// save .env.sample as .env.test, .env.development, or .env.production, then
// copy each project's app config settings into the appropriate .env.* file.
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
firebase.auth().setPersistence(
  firebase.auth.Auth.Persistence[process.env.FIREBASE_AUTH_STATE_PERSISTENCE]
);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();

const arrayFromSnapshot = (snapshot) => {
  const arr = [];
  snapshot.forEach((childSnapshot) => {
    arr.push({
      id: childSnapshot.key,
      ...childSnapshot.val() 
    });
  });

  return arr;
};

export {
  firebase,
  googleAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
  githubAuthProvider,
  arrayFromSnapshot,
  db as default
};

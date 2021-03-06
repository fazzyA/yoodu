import * as firebaseConfig from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// replace this variable, with your own config variable
// from your firebase project
var config = {
  apiKey: 'AIzaSyBJD83VYzoxTyabRIJf5zszdalYIaY3aDI',
  authDomain: 'yoodu-restaurant-directory.firebaseapp.com',
  databaseURL: 'https://yoodu-restaurant-directory.firebaseio.com',
  projectId: 'yoodu-restaurant-directory',
  storageBucket: 'yoodu-restaurant-directory.appspot.com',
  messagingSenderId: '774997419672',
  appId: '1:774997419672:web:e05b07f8104bf82b7a92ed',
  measurementId: 'G-CE083LFF56'
};
const firebase = firebaseConfig.initializeApp(config);
const firestore = firebaseConfig.firestore();
const firefunctions = firebaseConfig.functions();
const storage = firebase.storage();

firebase.firestore().settings({ timestampsInSnapshots: true });

export { firebase, firestore, firefunctions, storage };

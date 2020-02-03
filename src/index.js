import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, applyMiddleware,/*compose*/} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './Store/Reducers/rootReducer';
import firebase from 'firebase/app'
import 'firebase/auth'
// import {reduxFirestore, getFirestore} from 'redux-firestore'
// import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
// import fbconfig from './firebase'

const store = createStore(rootReducer,applyMiddleware(thunk));
firebase.auth().onAuthStateChanged(user=>{
  ReactDOM.render(<Provider store={store}><App/></Provider>,
    document.getElementById('root')
  );
})


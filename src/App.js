import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn: false,
    displayName: '',
    email: ''
  })
  const handleSignIn = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(response => {
      const {displayName,email,photoUrl,localId,createdAt,emailVerified} = response.user;
      const signedInUser ={
        isSignedIn: true,
        displayName: displayName,
        email: email
      }
      setUser(signedInUser)
    })
    
  }
  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(response => {
      const user={
        isSignedIn: false,
        displayName:'',
        email: ''
      }
      setUser(user)
    })
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
          <h1>Welcome, {user.displayName}</h1>
          <p>{user.email}</p>
        </div>
      }
    </div>
  );
}

export default App;

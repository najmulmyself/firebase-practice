import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn: false,
    password:'',
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
  const handleChange = (event) =>{
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid) // This is not showing valid output
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const isPassHasNumber = /\d{1}/.test(event.target.value);
      // console.log(isPassHasNumber)
      isFormValid = isPasswordValid && isPassHasNumber;
      // console.log(isPasswordValid)
    }
    if(isFormValid){
      const newInfo = {...user}
      newInfo[event.target.name] = event.target.value;
      setUser(newInfo);
    }
    // console.log(event.target.name + ':',event.target.value)
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
      <p>Email : {user.email} </p>
      <p>PassWord : {user.password} </p>
      <form action="">
        <input type="username" name="email" id="" placeholder="Enter Your Email" onBlur={handleChange}/><br/>
        <input type="password" name="password" id="" placeholder="Enter your password" onBlur={handleChange}/><br/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;

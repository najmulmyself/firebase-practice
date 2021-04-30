import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser,setNewUser] = useState({
    new : false,
  })
  const [user,setUser] = useState({
    isSignedIn: false,
    password:'',
    displayName: '',
    email: '',
    error: '',
    success: ''
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
      newInfo[event.target.name] = event.target.value; // this convention is not used before || newInfo[event.target.name] \WHAT IS THIS MEAN
      // Resolvee newInfo[event.target.name]
      //This is used to set the value?key in a object . | we dont know what will be the value (email,password) of user object |so that we use [] for dynamic the data
      // if we knew data is either email or password the we would use newInfo.email or newInfo.password.
      setUser(newInfo);
    }
    // console.log(event.target.name + ':',event.target.value)
    


    
  }
  const handleSubmit = (event) => {
    if(user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newInfo = {...user}
          newInfo.success = 'Account Created Successfully';
          newInfo.error = '';
          setUser(newInfo);
          // var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const newInfo= {...user}
          newInfo.error = error.message;
          newInfo.success = '';
          setUser(newInfo);

          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage , errorCode)
          // ..
        });
    }
    event.preventDefault();
  }
  const handleNewUser = () => {
    // let newOne = true;
    // newUser.new = newOne;
    setNewUser(!newUser.new);

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
      {/* <p>Email : {user.email} </p>
      <p>PassWord : {user.password} </p> */}
      {/* We Did it for test purposes */}
      <br/>
      <input type="checkbox" name="" id="" onClick={handleNewUser}/>
      <label htmlFor="">New User ? Sign Up</label>
      <form onSubmit={handleSubmit}>
        {
        newUser && <input type="text" name="name" placeholder="Enter Your Name" id=""/>
        }
        <br/>
        <input type="username" name="email" id="" placeholder="Enter Your Email" onBlur={handleChange} required/><br/>
        <input type="password" name="password" id="" placeholder="Enter your password" onBlur={handleChange} required/><br/>
        <input type="submit" value="Submit"/>
      </form>
      <p style={{color: 'green'}}>{user.success}</p>
      <p style={{color: 'red'}}>{user.error}</p>
    </div>
  );
}

export default App;

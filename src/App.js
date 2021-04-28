import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const handleClick = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(response => {
      const {displayName,email,photoUrl,localId,createdAt,emailVerified} = response.user;
      console.log(displayName, email, photoUrl,localId,createdAt,emailVerified);
      console.log(response.user)
    })
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Sign In</button>
    </div>
  );
}

export default App;

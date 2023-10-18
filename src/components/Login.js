import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './../utils/firebase';
import { useDispatch } from "react-redux";
import {addUser} from '../utils/userSlice'
import { BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch()

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Validate the form data
    const email1 = email?.current.value;
    const password1 = password?.current.value;
    const name1 =  name?.current?.value
    const message = checkValidData(email1, password1, name1)
    setErrorMessage(message)

    if(message) return;

    if(!isSignInForm) {
        // Sign Up Logic
        createUserWithEmailAndPassword(auth, email1, password1)
        .then(userCredential => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name1, photoURL: USER_AVATAR
            }).then(() => {
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
            }).catch(error => {
                console.log(error)
                setErrorMessage(error.message)
            })

           
        })
        .catch(error=> {
            const errorCode = error.code;
            const errorMessage = error.message
            setErrorMessage(errorCode + '-' +errorMessage)
        })
    }else {
        // Sign In Logic
        signInWithEmailAndPassword(auth, email1, password1)
        .then(userCredential => {
            const user = userCredential.user;
            
        })
        .catch(error=> {
            const errorCode = error.code;
            const errorMessage = error.message
            setErrorMessage(errorCode + '-' +errorMessage)
        })
    }
    
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="background"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()}
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}

        <input
        ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        <input
        ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        <p className="text-red-500 font-bold py-2">{errorMessage}</p>

        <button 
        className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p 
        className="py-4 cursor-pointer" 
        onClick={toggleSignInForm} >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>

      </form>
    </div>
  );
};

export default Login;

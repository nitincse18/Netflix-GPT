import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './../utils/firebase';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/userSlice'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
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
                displayName: name1, photoURL: 'https://avatars.githubusercontent.com/u/38283863?v=4'
            }).then(() => {
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                navigate("/browse")
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
            console.log('user---', user)
            navigate("/browse")
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg"
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

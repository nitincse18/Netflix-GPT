import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/userSlice'

const Body = () => {
    const dispacth = useDispatch();
    
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            const {uid, email, displayName, photoURL} = user;
            dispacth(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
        }else{
            // User is signed out
            dispacth(removeUser())
        }
    })
  }, [])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;

import { signOut, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/userSlice'
import { LOGO } from '../utils/constant'

const Header = () => {
  const dispacth = useDispatch();
  const navigate  = useNavigate()
  const user = useSelector(store => store.user)
  const handleSignout = () => {
    signOut(auth).then(() => {

    }).catch(error => {
      navigate('/error')
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
            const {uid, email, displayName, photoURL} = user;
            dispacth(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
            navigate('/browse')
        }else{
            // User is signed out
            dispacth(removeUser())
            navigate('/')
        }
    });

    // Unsubscribe when component unmounts
    return ()=> unsubscribe();
  }, [])

  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-48'
        src={LOGO}
         alt='logo' />

         {user && <div className='flex p-2'>
          <img className='w-10 h-10 my-2'
          alt='usericon'
            src={user?.photoURL} />

            <button onClick={handleSignout} className='font-bold text-white'>(Sign Out)</button>
         </div>}
    </div>
  )
}

export default Header
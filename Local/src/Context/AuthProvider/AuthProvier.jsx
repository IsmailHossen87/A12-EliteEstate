import React, { createContext, useEffect, useState } from 'react';
// import app from '../FireBase/FireBase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import auth from '../../Firebase/Firebase';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
export const AuthContext = createContext()
// const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

// step1  popUp
    const googleLogin =()=>{
      setLoading(true)
      return signInWithPopup(auth,googleProvider)
  }
// step2 create user 
  const createUser = (email,password)=>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
     
  }
  // stpe 3 signIn
  const signIn = (email,password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth,email,password)
  }
  const updateUserProfile =(name,photo)=>{
      return updateProfile(auth.currentUser,{
          displayName:name, photoURL: photo
      })
  }
     // signOut
     const logOut =()=>{
      setLoading(true)
      return signOut(auth)
     }
       // forget password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };


    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        // setUser(currentUser)
        if(currentUser){
          const userInfo = {email:currentUser?.email}
          axiosPublic.post('/jwt',userInfo)
          .then(res=>{
            if(res.data.token){
              localStorage.setItem('token',res.data?.token)
              setUser(currentUser)
              setLoading(false)
            }
          })
        }else{
          localStorage.removeItem('token')
          setUser(null)
          setLoading(false)
        }
      });
      return () => unSubscribe();
    }, [axiosPublic]);
  
    
  
    const authInfo = {
      user,
      loading,
      googleLogin,
      createUser,
      signIn,
      updateUserProfile,
      logOut ,
      resetPassword
    };
  
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;

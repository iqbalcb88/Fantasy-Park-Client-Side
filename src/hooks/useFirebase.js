import { useEffect, useState } from 'react';
import initAppAuth from '../Firebase/firebase.init';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
initAppAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const signInWithGoogle = () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    // return it for use at signIn redirect
    return signInWithPopup(auth, googleProvider);
  };

  const createWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailPassLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const loggedOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return unsubscribed;
  }, []);

  return {
    user,
    signInWithGoogle,
    error,
    loggedOut,
    createWithEmailPass,
    emailPassLogin,
    isLoading,
    setUser,
    setIsLoading,
  };
};

export default useFirebase;

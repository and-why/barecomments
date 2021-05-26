import { cookieStorageManager } from '@chakra-ui/color-mode';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './db';
import firebase from './firebase';
import cookie from 'js-cookie';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
      cookie.set('bare-comments-auth', true, { expires: 1 });
      return user;
    } else {
      setUser(false);
      cookie.remove('bare-comments-auth');
      return false;
    }
  };

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };
  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      })
      .then((window.location = '/'));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    token: user.za,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  };
};

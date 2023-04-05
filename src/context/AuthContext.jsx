import { signOut, updateCurrentUser, updateProfile } from "firebase/auth";
import { useEffect, useState, useContext, createContext } from "react";
import {
  auth,
  onUserStateChange,
  signInWithEmail,
  signInWithGoogle,
} from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const signOutForUser = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      signOut(auth)
        .then(() => {
          alert("Sign-out successful");
          setUser(null);
        })
        .catch((error) => {
          console.log(`${error.code} : ${error.massage}`);
        });
    }
  };

  const updateUserProfile = async (user, newDisplayName) => {
    return updateProfile(user, {
      displayName: newDisplayName,
    })
      .then(async () => {
        const newUser = auth.currentUser;
        console.debug(`SUJIN:: ~ .then ~ newUser:`, newUser);
        await updateCurrentUser(auth, newUser);
        setUser({ ...newUser });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user && user.uid,
        login: signInWithEmail || signInWithGoogle,
        signOutForUser,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

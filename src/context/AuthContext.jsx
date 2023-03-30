import { useEffect, useState, useContext, createContext } from "react";
import {
  onUserStateChange,
  signInWithEmail,
  signInWithGoogle,
  signOutForUser,
} from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

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
        logout: signOutForUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

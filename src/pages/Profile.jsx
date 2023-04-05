import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgieet } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user, updateUserProfile, signOutForUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutForUser();
    navigate("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== newDisplayName) {
      return updateUserProfile(user, newDisplayName);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAgieet(user.uid);
    setIsLoading(false);
  }, [user.uid]);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName || ""}
          onChange={onChange}
          className={styles.input}
        />
        <button className={styles.button}>Update Profile</button>
      </form>
      <div className={styles.logoutBox}>
        <button onClick={handleLogout} className={styles.logout}>
          Logout
        </button>
        {isLoading && "Loading..."}
      </div>
    </>
  );
}

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../api/firebase";
import Agieet from "../components/Agieet";
import AgieetCreate from "../components/AgieetCreate";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const [agieets, setAgieets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const q = query(collection(db, "agieets"), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setIsLoading(true);
      const agieetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgieets(agieetArray);
      setIsLoading(false);
    });
  }, [q]);

  return (
    <>
      <AgieetCreate />
      <div>
        {isLoading && "Loading..."}
        {agieets.map((agieet) => (
          <Agieet
            key={agieet.id}
            agieet={agieet}
            isOwner={agieet.creatorId === user.uid}
          />
        ))}
      </div>
    </>
  );
}

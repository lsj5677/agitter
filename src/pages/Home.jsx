import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { addAgieet, db, get, getAgieetData } from "../api/firebase";
import Agieet from "../components/Agieet";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
  const [agieet, setAgieet] = useState("");
  const [agieets, setAgieets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext();
  const q = query(collection(db, "agieets"), orderBy("createdAt", "desc"));

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   const res = await getAgieetData();
  //   console.log("rrrrrr", res);
  //   setAgieets([...res]);
  //   setIsLoading(false);
  // };

  const fetchData = () => {
    setIsLoading(true);
    onSnapshot(q, (snapshot) => {
      const agieetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgieets(agieetArray);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addAgieet(agieet, user.uid);
    setAgieet("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
          value={agieet}
          onChange={(e) => setAgieet(e.target.value)}
        />
        <button>Agieet</button>
      </form>
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
    </div>
  );
}

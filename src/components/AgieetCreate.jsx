import { useState, useRef } from "react";
import { addAgieet } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function AgieetCreate() {
  const { user } = useAuthContext();
  const [agieet, setAgieet] = useState("");
  const [imageFile, setImageFile] = useState("");
  const fileInput = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (agieet === "") return;

    addAgieet(agieet, user.uid, imageFile);
    setAgieet("");
    setImageFile("");
    fileInput.current.value = null;
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const currentTarget = finishedEvent.currentTarget.result;
      setImageFile(currentTarget);
    };
    reader.readAsDataURL(theFile);
  };

  const handleClearPhoto = () => {
    setImageFile(null);
    fileInput.current.value = null;
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <button>Agieet</button>
        {imageFile && (
          <div>
            <img src={imageFile} alt={agieet.text} width="50px" height="50px" />
            <button onClick={handleClearPhoto}>Clear Photo</button>
          </div>
        )}
      </form>
    </div>
  );
}

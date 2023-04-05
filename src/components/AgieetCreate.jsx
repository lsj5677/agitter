import { useState, useRef } from "react";
import { addAgieet } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import styles from "./AgieetCreate.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

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
    <div className={styles.agieetCreate}>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="what's on your mind?"
            maxLength={120}
            value={agieet}
            onChange={(e) => setAgieet(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button}>
            <AiOutlinePlus />
          </button>
        </div>
        <label htmlFor="attach-file" className={styles.label}>
          <span>Add photos</span>
          <AiOutlinePlus />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
          className={styles.inputFile}
        />
        {imageFile && (
          <div className={styles.attachImg}>
            <img src={imageFile} alt={agieet.text} />
            <button onClick={handleClearPhoto}>
              <ImCancelCircle />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

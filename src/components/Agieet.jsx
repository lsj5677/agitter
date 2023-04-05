import { useState } from "react";
import { deleteAgieet, updateAgieet } from "../api/firebase";
import styles from "./Agieet.module.css";
import { BsTrash3 } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export default function Agieet({ agieet, isOwner }) {
  const { id, text, resPhotoUrl } = agieet;
  const [edit, setEdit] = useState(false);
  const [newAgieet, setNewAgieet] = useState();

  const toggleEdit = () => setEdit((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewAgieet(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateAgieet(agieet.id, newAgieet);
    setEdit(false);
  };
  const handleDelete = () => {
    const confirmOk = window.confirm(
      "Are you sure you want to delete this agieet?"
    );
    if (confirmOk) {
      deleteAgieet(id, resPhotoUrl);
    }
  };
  return (
    <div>
      {edit ? (
        <div className={styles.agieet}>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your agieet"
              value={newAgieet || agieet.text}
              required
              onChange={onChange}
              className={styles.input}
            />
            <button className={styles.update}>Update</button>
          </form>
          <button onClick={toggleEdit} className={styles.cancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.agieet}>
          <h4>{text}</h4>
          {resPhotoUrl && (
            <img src={resPhotoUrl} width="50px" height="50px" alt={text} />
          )}
          {isOwner && (
            <div className={styles.buttonGroup}>
              <button onClick={handleDelete}>
                <BsTrash3 />
              </button>
              <button onClick={toggleEdit}>
                <FaRegEdit />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

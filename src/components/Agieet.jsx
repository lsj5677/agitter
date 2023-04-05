import { useState } from "react";
import { deleteAgieet, updateAgieet } from "../api/firebase";

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
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your agieet"
              value={newAgieet || agieet.text}
              required
              onChange={onChange}
            />
            <button>Update</button>
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <div>
          <h4>{text}</h4>
          {resPhotoUrl && (
            <img src={resPhotoUrl} width="50px" height="50px" alt={text} />
          )}
          {isOwner && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

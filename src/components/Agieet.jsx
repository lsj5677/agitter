import { useState } from "react";
import { deleteAgieet, updateAgieet } from "../api/firebase";

export default function Agieet({ agieet, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newAgieet, setNewAgieet] = useState();

  const toggleEdit = () => setEdit((prev) => !prev);
  const handleEdit = () => {};
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
      deleteAgieet(agieet.id);
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
          <h4>{agieet.text}</h4>
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

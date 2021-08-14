import React, { useState } from "react";
import { UserNameModalProps } from "./UserNameModalType";
import { auth, db } from "../../utils/fbInit";

function UserNameModal({ setShowUserNameModal }: UserNameModalProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (username: string) => {
    const userId = auth.currentUser?.uid;
    try {
      const userRef = await db.collection("users").doc(userId);
      if ((await userRef.get()).exists) {
        return setError("User already exist");
      }
      const result = await auth.currentUser?.updateProfile({
        displayName: username,
      });
      await userRef.set({ userId, username: auth.currentUser?.displayName });
      setShowUserNameModal(false);
    } catch (err) {
      setError("Something wrong happened");
    }
  };
  return (
    <div className="z-10 h-full w-full fixed bg-opacity-50 bg-black">
      <div className="relative mx-10 -my-20 top-1/2 text-center bg-white p-4">
        <label>
          Please enter your name:
          <input
            type="text"
            className="w-full border-2 mt-2"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => onSubmit(username)}
        >
          Submit
        </button>
        {error ? <div className="mt-2"></div> : null}
      </div>
    </div>
  );
}

export default UserNameModal;

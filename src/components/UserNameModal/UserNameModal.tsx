import React, { useState } from "react";
import { UserNameModalErrors, UserNameModalProps } from "./UserNameModalType";
import { auth, db } from "../../utils/fbInit";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import * as styles from "./UserNameModal.module.css";

function UserNameModal({
  showUserNameModal,
  setShowUserNameModal,
}: UserNameModalProps) {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({} as UserNameModalErrors);

  const handleSubmit = async () => {
    setErrors({} as UserNameModalErrors);
    if (!username || username === "")
      return setErrors({ ...errors, username: "Please enter your name" });
    const userId = auth.currentUser?.uid;
    try {
      const userRef = await db.collection("users").doc(userId);
      if ((await userRef.get()).exists) {
        return setErrors({ ...errors, server: "User already exist" });
      }
      await auth.currentUser?.updateProfile({
        displayName: username,
      });
      await userRef.set({ userId, username: auth.currentUser?.displayName });
      setShowUserNameModal(false);
    } catch (err) {
      setErrors({ ...errors, server: "Something went wrong" });
    }
  };

  return (
    <Modal show={showUserNameModal} centered>
      <Modal.Header>
        <Modal.Title>Please tell us your name before continuing</Modal.Title>
      </Modal.Header>
      <Form className={styles.form}>
        <Form.Group className="mb-1" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
      {errors.server ? (
        <Alert className={styles.alert} variant="warning">
          {errors.server}
        </Alert>
      ) : null}
      <Modal.Footer>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserNameModal;

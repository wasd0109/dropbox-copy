import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { AiOutlineFileAdd } from "react-icons/ai";
import * as styles from "./Main.module.css";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { storage, db } from "../../utils/fbInit";
import { MainProps } from "./MainType";
import { v4 as uuidv4 } from "uuid";
import useStorageList from "../../hooks/useStorageList";

import FileList from "../../components/FileList";

function Main({ user }: MainProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pathToFile, setPathToFile] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const storageRef = storage.ref(`${user.uid}`);
  const { result, loading } = useStorageList();

  const onSubmit = () => {
    const filename = pathToFile.split("\\").pop();
    const fileRef = storageRef.child(`${filename}`);
    if (file) {
      setUploading(true);
      const fileId = uuidv4();
      fileRef.put(file).then((result) => {
        const metadata = {
          customMetadata: {
            fileId: fileId,
          },
        };
        fileRef.updateMetadata(metadata);
        try {
          db.collection("files").doc(fileId).set({
            filename: filename,
            userId: user.uid,
            date: result.metadata.timeCreated,
            size: result.metadata.size,
          });
        } catch (err) {
          console.log(err);
        }
      });
    }
    setShowUploadModal(false);
    setUploading(false);
    setPathToFile("");
    setFile(null);
  };

  const handleHidePrompt = () => {
    setShowUploadModal(false);
    setPathToFile("");
    setFile(null);
  };

  return (
    <div>
      <Navbar />
      <Container fluid>
        <div className={styles.actionBtns}>
          <Button onClick={() => setShowUploadModal(true)}>
            <AiOutlineFileAdd />
            Upload
          </Button>
        </div>
        {loading ? null : <FileList fileList={result} uid={user.uid} />}
      </Container>
      <Modal show={showUploadModal} centered onHide={() => handleHidePrompt()}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select a file to upload</p>
          {uploading ? (
            <Spinner animation="border" />
          ) : (
            <input
              type="file"
              value={pathToFile}
              onChange={(e) => {
                setPathToFile(e.target.value);
                setFile(e.target.files !== null ? e.target.files[0] : null);
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Main;

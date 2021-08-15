import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { AiOutlineFileAdd } from "react-icons/ai";
import * as styles from "./Main.module.css";
import { Button, Container, Modal } from "react-bootstrap";
import { storage, db } from "../../utils/fbInit";
import { MainProps } from "./MainType";
import useStorageList from "../../hooks/useStorageList";
import { saveAs } from "file-saver";
import { SaveAltSharp } from "@material-ui/icons";

function Main({ user }: MainProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [pathToFile, setPathToFile] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [refresh, setRefresh] = useState({});
  const storageRef = storage.ref(`${user.uid}`);

  const { result: fileList, loading } = useStorageList(user.uid, refresh);

  const onSubmit = () => {
    const filename = pathToFile.split("\\").pop();
    const fileRef = storageRef.child(`${filename}`);
    if (file) {
      fileRef.put(file).then((result) => {
        console.log(result.metadata.fullPath);
        try {
          db.collection("files").add({
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
    setRefresh({});
    setShowUploadModal(false);
  };

  const downloadFile = async (filename: string) => {
    const fileRef = storageRef.child(filename);

    const downloadUrl = await fileRef.getDownloadURL();
    const result = await fetch(downloadUrl, { method: "GET" });
    const blob = await result.blob();
    saveAs(blob, fileRef.name);
  };
  console.log(fileList);
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
        {loading
          ? null
          : fileList.map((file) => (
              <div>
                <h1>{file.filename}</h1>
                <Button onClick={() => downloadFile(file.filename)}>
                  Download
                </Button>
              </div>
            ))}
      </Container>
      <Modal
        show={showUploadModal}
        centered
        onHide={() => setShowUploadModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload a file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select a file to upload</p>
          <input
            type="file"
            value={pathToFile}
            onChange={(e) => {
              setPathToFile(e.target.value);
              setFile(e.target.files !== null ? e.target.files[0] : null);
            }}
          />
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

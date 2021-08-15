import React from "react";
import Moment from "react-moment";
import { Button, ListGroup } from "react-bootstrap";
import { auth, storage, db } from "../../utils/fbInit";
import { saveAs } from "file-saver";
import * as styles from "./FileListItem.module.css";

type FileListItemProps = {
  filename: string;
  size: number;
  date: string;
};

const sizeToSuitableUnit = (size: number) => {
  const sizeString = size.toString();
  if (sizeString.length > 6) {
    return `${(size / 1000000).toFixed(2)} mb`;
  } else if (sizeString.length > 3) {
    return `${(size / 1000).toFixed(2)} kb`;
  }
};

function FileListItem({ filename, size, date }: FileListItemProps) {
  const storageRef = storage.ref(`${auth.currentUser?.uid}`);
  const downloadFile = async (filename: string) => {
    const fileRef = storageRef.child(filename);
    const downloadUrl = await fileRef.getDownloadURL();
    const result = await fetch(downloadUrl, { method: "GET" });
    const blob = await result.blob();
    saveAs(blob, fileRef.name);
  };

  const deleteFile = (filename: string) => {
    const fileRef = storageRef.child(filename);
    fileRef.getMetadata().then(({ customMetadata: { fileId } }) => {
      fileRef.delete().then(() => {
        db.collection("files").doc(fileId).delete();
      });
    });
  };
  return (
    <ListGroup.Item className={styles.item}>
      <p>{filename}</p>
      <p>{sizeToSuitableUnit(size)}</p>
      <Moment format="L HH:MM">{date}</Moment>
      <div className={styles.buttons}>
        <Button onClick={() => downloadFile(filename)}>Download</Button>
        <Button variant="danger" onClick={() => deleteFile(filename)}>
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}

export default FileListItem;

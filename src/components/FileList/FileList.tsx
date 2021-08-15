import React from "react";
import { File } from "../../hooks/useStorageList";
import { Button } from "react-bootstrap";
import { storage, db } from "../../utils/fbInit";
import { saveAs } from "file-saver";

type FileListProps = {
  fileList: File[];
  uid: string;
};

function FileList({ fileList, uid }: FileListProps) {
  const storageRef = storage.ref(`${uid}`);
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
    <div>
      {fileList.map((file) => (
        <div>
          <h1>{file.filename}</h1>
          <p>{(file.size / 1000000).toFixed(2)}MB</p>
          <p>{file.date}</p>
          <Button onClick={() => downloadFile(file.filename)}>Download</Button>
          <Button variant="danger" onClick={() => deleteFile(file.filename)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}

export default FileList;

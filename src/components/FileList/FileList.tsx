import React, { useState, useEffect } from "react";
import { File } from "../../hooks/useStorageList";

import { ListGroup } from "react-bootstrap";
import styles from "./FileList.module.css";
import FileListItem from "../FileListItem";

const sortByAscending = (a: string | number, b: string | number) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const sortByDescending = (a: string | number, b: string | number) => {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
};

const sorting = (sortingBy: SortingState, fileList: File[]) => {
  const { field, ascending } = sortingBy;
  switch (field) {
    case "name":
      return fileList.sort((a, b) => {
        let fa = a.filename.toLowerCase();
        let fb = b.filename.toLowerCase();
        if (ascending) return sortByAscending(fa, fb);
        else return sortByDescending(fa, fb);
      });
    case "size":
      return fileList.sort((a, b) => {
        const fa = a.size;
        const fb = b.size;
        if (ascending) return sortByAscending(fa, fb);
        else return sortByDescending(fa, fb);
      });
    default:
      return fileList;
  }
};

type FileListProps = {
  fileList: File[];
  uid: string;
};

type Field = "name" | "date" | "size";

type SortingState = {
  field: Field;
  ascending: boolean;
};

function FileList({ fileList, uid }: FileListProps) {
  const [sortedList, setSortedList] = useState<File[]>([]);
  const [sortingBy, setSortingBy] = useState<SortingState>({
    field: "name",
    ascending: true,
  });

  useEffect(() => {
    setSortedList(sorting(sortingBy, fileList));
  }, [sortingBy, fileList]);
  return (
    <div className={styles.container}>
      <ListGroup>
        <ListGroup.Item className={styles.sortBar}>
          <div>
            <p
              onClick={() =>
                setSortingBy({ field: "name", ascending: !sortingBy.ascending })
              }
            >
              Name
            </p>
          </div>
          <div>
            <p>Size</p>
          </div>
          <div>
            <p>Created at</p>
          </div>
        </ListGroup.Item>
        {sortedList.map((file) => (
          <FileListItem {...file} key={file.filename} />
        ))}
      </ListGroup>
    </div>
  );
}

export default FileList;

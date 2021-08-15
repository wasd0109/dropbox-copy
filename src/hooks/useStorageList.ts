import { useEffect, useState } from "react";
import { db, storage, auth } from "../utils/fbInit";

export type File = {
  filename: string;
  userId: string;
  size: number;
  date: string;
};

const useStorageList = () => {
  const uid = auth.currentUser?.uid;
  let [result, setResult] = useState<File[]>([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const listener = db
      .collection("files")
      .where("userId", "==", uid)
      .onSnapshot((result) => {
        const temp = [] as File[];
        result.docs.forEach((doc) => {
          const data = doc.data() as File;
          temp.push(data);
        });
        console.log(temp);
        setResult(temp);
      });

    setLoading(false);
    return listener;
  }, [uid]);
  return { result, loading };
};

export default useStorageList;

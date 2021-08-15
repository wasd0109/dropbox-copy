import { useEffect, useState } from "react";
import { db, storage } from "../utils/fbInit";

type File = {
  filename: string;
  userId: string;
  size: number;
  date: string;
};

const useStorageList = (uid: string, refresh: {}) => {
  let [result, setResult] = useState<File[]>([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const getItemLists = async () => {
      const temp = [] as File[];
      const result = await db
        .collection("files")
        .where("userId", "==", uid)
        .get();
      result.docs.forEach((doc) => {
        const data = doc.data() as File;
        temp.push(data);
      });
      setResult(temp);
    };
    getItemLists();
    setLoading(false);
  }, [uid, refresh]);
  return { result, loading };
};

export default useStorageList;

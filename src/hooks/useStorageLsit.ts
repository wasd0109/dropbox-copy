import { useEffect, useState } from "react";
import { storage } from "../utils/fbInit";

type File = {
  name: string;
};

const useStorageList = (uid: string, refresh: {}) => {
  let [result, setResult] = useState<File[]>([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    const getItemLists = async () => {
      const storageRef = storage.ref(uid);
      let tempArray = [] as any;
      const lists = await storageRef.listAll();
      await lists.items.forEach(async (itemRef) =>
        tempArray.push({
          name: itemRef.name,
        })
      );
      setResult(tempArray);
    };
    getItemLists();
    setLoading(false);
  }, [uid, refresh]);
  return { result, loading };
};

export default useStorageList;

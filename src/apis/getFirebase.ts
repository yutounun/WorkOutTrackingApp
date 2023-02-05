import {
  collection,
  query,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/init";
export const getData = async (collectionLabel: string) => {
  const q = query(collection(db, collectionLabel));
  const querySnapshot = await getDocs(q);
  const rtnArr: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    rtnArr.push(doc.data());
  });
  console.log("getData :", rtnArr);

  return rtnArr;
};

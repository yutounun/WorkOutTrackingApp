import {
  collection,
  query,
  getDocs,
  orderBy,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/init";

export const getData = async (collectionLabel: string) => {
  try {
    const q = query(collection(db, collectionLabel), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const rtnArr: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      rtnArr.push(doc.data());
    });
    console.log("getData :", rtnArr);

    return rtnArr;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

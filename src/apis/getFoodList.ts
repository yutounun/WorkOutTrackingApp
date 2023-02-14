import { db } from "@/firebase/init";
import {
  doc,
  collection,
  getDocs,
  type DocumentData,
} from "firebase/firestore";

export const getFoodsList = async (email: string) => {
  // Get the ref to each user doc
  const userDocRef = doc(db, "users", email);
  // Get the ref to foods collection in user doc
  const colRef = collection(userDocRef, "foods");
  // add data in workouts ref
  const foodDocs = await getDocs(colRef);

  const list: DocumentData[] = [];

  foodDocs.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
};

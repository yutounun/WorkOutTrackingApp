import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/init";

export const registerData = async (collectionLabel: string, obj: object) => {
  const collectionRef = collection(db, collectionLabel);

  const sentData = addDoc(collectionRef, obj);
  console.log("sentData :", sentData);
  return sentData;
};

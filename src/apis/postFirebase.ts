import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/init";

export const registerData = async (
  collectionLabel: string,
  obj: object,
  email: string
) => {
  // document id is an email
  const sentData = await setDoc(doc(db, collectionLabel, email), obj);
  console.log("sentData :", sentData);
  return sentData;
};

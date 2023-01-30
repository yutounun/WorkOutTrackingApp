import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

export const getData = async (collection: string, document: string) => {
  // Get data of a specified document
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

export const registerData = async (
  collectionLabel: string,
  docLabel: string
) => {
  const collectionRef = collection(db, collectionLabel);

  const sentData = setDoc(doc(collectionRef, docLabel), {
    foods: [
      {
        carbo: 1200,
        cost: 400,
        fat: 30,
        name: "salmon",
        protein: 30,
      },
      {
        carbo: 100,
        cost: 1000,
        fat: 70,
        name: "portk",
        protein: 50,
      },
    ],
  });
  console.log("sentData :", sentData);
};

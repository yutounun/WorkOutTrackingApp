import { db } from "@/firebase/init";
import {
  collection,
  getDocs,
  query,
  orderBy,
  type DocumentData,
} from "firebase/firestore";

export const getFoodsList = async (email: string, order: any) => {
  const list: DocumentData[] = [];
  const q = query(
    collection(db, "users", email, "foods"),
    orderBy("date", order)
  );
  const snapShots = await getDocs(q);
  snapShots.forEach((s) => {
    list.push(s.data());
  });
  return list;
};

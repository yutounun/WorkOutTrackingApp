import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Successfully registered!");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

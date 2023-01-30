import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user :", user);
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

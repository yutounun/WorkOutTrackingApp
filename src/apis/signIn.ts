import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

export const signIn = async (email: string, password: string) => {
  let status;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      status = true;
      console.log("user :", user);
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  return status;
};

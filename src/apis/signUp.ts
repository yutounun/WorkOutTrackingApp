import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";

export const signUp = async (email: string, password: string) => {
  let rtn;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Successfully registered!");
      rtn = true;
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
  return rtn;
};

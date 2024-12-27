import {
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCred) => {
    console.log(userCred);
    window.location.reload();
  });
};

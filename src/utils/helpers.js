import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider).then((userCred) => {
    window.location.reload();
  });
};
export const signInWithGitHub = async () => {
  await signInWithPopup(auth, githubProvider).then((userCred) => {
    window.location.reload();
  });
};

export const Menus = [
  { id: uuidv4(), name: "Projects", uri: "/home/projects" },
  { id: uuidv4(), name: "Collections", uri: "/home/collection" },
  { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];

export const signOutFunction = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};

export const signOutAction = async () => {
  await auth.signOut().then(() => window.location.reload());
};

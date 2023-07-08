import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const logOut = () => {
  signOut(auth);
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    login_hint: "user@example.com",
  });
  return Promise.resolve()
    .then(() => {
      logOut();
      console.log("logged out");
    })
    .then(() => {
      signInWithPopup(auth, provider);
      console.log("then logged in");
    });
};

export const facebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log("autheni error", error);
  }
};

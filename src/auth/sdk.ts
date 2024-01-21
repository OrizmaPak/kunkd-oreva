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
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const facebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    return error;
  }
};

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
  console.log("then logged in result", result);
  return result;
};

export const facebookSignIn = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Facebook result", result);
    return result;
  } catch (error) {
    console.log("autheni error", error);
  }
};

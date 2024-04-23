import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./authStore";
import createPushSlice, { PushSlice } from "./pushTokenStore";
import createForgotPasswordSlice, {
  ForgotPasswordOtpSlice,
} from "./forgotPasswordOtp";
import createProfileSlice, { ProfileSlice } from "./profileStore";

type Store = AuthSlice & PushSlice & ForgotPasswordOtpSlice & ProfileSlice;

const useStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
  ...createPushSlice(...a),
  ...createForgotPasswordSlice(...a),
  ...createProfileSlice(...a),
}));

export default useStore;

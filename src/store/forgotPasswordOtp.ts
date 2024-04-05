import { StateCreator } from "zustand";
// import { User } from "firebase/auth";

type State = {
  forgotPasswordOtp: string | undefined;
};

type Action = {
  setForgotPasswordOtp: (user: State["forgotPasswordOtp"]) => void;
};
export type ForgotPasswordOtpSlice = State & Action;
const createForgotPasswordSlice: StateCreator<ForgotPasswordOtpSlice> = (
  set
) => ({
  forgotPasswordOtp: undefined,
  setForgotPasswordOtp: (forgotPasswordOtp) =>
    set(() => ({ forgotPasswordOtp })),
});
export default createForgotPasswordSlice;

export const getForgotPasswordOtp = (
  state: ForgotPasswordOtpSlice
): [State["forgotPasswordOtp"], Action["setForgotPasswordOtp"]] => [
  state.forgotPasswordOtp,
  state.setForgotPasswordOtp,
];

import { StateCreator } from "zustand";
import { TUser } from "@/api/types";

export type returnUser = {
  dob: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  token: string;
  user_id: number;
  user_image: string;
  contact_name: string;
  post_code: string;
  tax_id: string;
  country_id: string;
  state_id: string;
};

type State = {
  user: TUser;
};

type Action = {
  setUser: (user: State["user"]) => void;
};

const getLocalStorage = (key: string): State["user"] => {
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
};
const setLocalStorage = (key: string, value: State["user"]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export type AuthSlice = State & Action;

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  // user: null,
  // setUser: (user) => set((state) => ({ ...state.user, user })),

  user: getLocalStorage("user") || null,
  setUser: (user) =>
    set((state) => {
      console.log("----- sate auth setter", state, user);
      setLocalStorage("user", user);
      return { ...state, user };
    }),
});
export default createAuthSlice;

export const getUserState = (
  state: AuthSlice
): [State["user"], Action["setUser"]] => [state.user, state.setUser];

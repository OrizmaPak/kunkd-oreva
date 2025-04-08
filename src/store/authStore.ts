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
  setUser: (user: Partial<State["user"]>) => void;
  setSchoolAddress: (address: {
    address: string;
    contact_name: string;
  }) => void;
};

const getLocalStorage = (key: string): State["user"] => {
  const localData = sessionStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
};
const setLocalStorage = (key: string, value: State["user"]) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export type AuthSlice = State & Action;

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  // user: null,
  // setUser: (user) => set((state) => ({ ...state.user, user })),

  user: getLocalStorage("user") || null,
  setUser: (user) =>
    set((state) => {
      setLocalStorage("user", user);
      return { ...state, user: { ...state.user, ...user } };
    }),
  setSchoolAddress: (data) =>
    set((state) => {
      return {
        ...state,
        user: { ...state.user, school: { ...state.user?.school, ...data } },
      };
    }),
});
export default createAuthSlice;

export const getUserState = (
  state: AuthSlice
): [State["user"], Action["setUser"], Action["setSchoolAddress"]] => [
  state.user,
  state.setUser,
  state.setSchoolAddress,
];

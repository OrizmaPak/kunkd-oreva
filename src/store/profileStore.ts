import { StateCreator } from "zustand";
// import { TProfileData } from "@/api/types";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";

type State = {
  profile: selectAvatarType[];
};

type Action = {
  setProfile: (user: State["profile"]) => void;
};

const getLocalStorage = (key: string): State["profile"] => {
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
};
const setLocalStorage = (key: string, value: State["profile"]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export type ProfileSlice = State & Action;

const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profile: getLocalStorage("profile") || null,
  setProfile: (profile) =>
    set((state) => {
      setLocalStorage("profile", profile);
      return { ...state, profile };
    }),
});
export default createProfileSlice;

export const getProfileState = (
  state: ProfileSlice
): [State["profile"], Action["setProfile"]] => [
  state.profile,
  state.setProfile,
];

import { StateCreator } from "zustand";
// import { TProfileData } from "@/api/types";
import { selectAvatarType } from "@/pages/AfterParentSignIn/SelectProfile";

type State = {
  profiles: selectAvatarType[];
};

type Action = {
  setProfiles: (user: State["profiles"]) => void;
};

const getLocalStorage = (key: string): State["profiles"] => {
  const localData = sessionStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
};
const setLocalStorage = (key: string, value: State["profiles"]) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

export type ProfileSlice = State & Action;

const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  profiles: getLocalStorage("profiles") || null,
  setProfiles: (profiles) =>
    set((state) => {
      setLocalStorage("profiles", profiles);
      return { ...state, profiles };
    }),
});
export default createProfileSlice;

export const getProfileState = (
  state: ProfileSlice
): [State["profiles"], Action["setProfiles"]] => [
  state.profiles,
  state.setProfiles,
];

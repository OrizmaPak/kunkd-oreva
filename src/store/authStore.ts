import { StateCreator } from "zustand";
import { User } from "firebase/auth";

type State = {
  user: User | null;
};

type Action = {
  setUser: (user: State["user"]) => void;
};

export type AuthSlice = State & Action;

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});
export default createAuthSlice;

export const getUserState = (
  state: AuthSlice
): [State["user"], Action["setUser"]] => [state.user, state.setUser];

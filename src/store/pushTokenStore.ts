import { StateCreator } from "zustand";
// import { User } from "firebase/auth";

type State = {
  pushToken: string | null;
};

type Action = {
  setToken: (user: State["pushToken"]) => void;
};

export type PushSlice = State & Action;

const createPushSlice: StateCreator<PushSlice> = (set) => ({
  pushToken: null,
  setToken: (pushToken) => set(() => ({ pushToken })),
});
export default createPushSlice;

export const getPushTokenState = (
  state: PushSlice
): [State["pushToken"], Action["setToken"]] => [
  state.pushToken,
  state.setToken,
];

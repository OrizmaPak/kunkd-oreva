import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./authStore";
type Store = AuthSlice;
const useStore = create<Store>()((...a) => ({
  ...createAuthSlice(...a),
}));

export default useStore;

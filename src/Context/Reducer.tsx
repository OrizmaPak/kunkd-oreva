export type State = {
  email: string;
  userType: string;
};
export const userInitialState = { email: "", userType: "" };
type Action = { type: "LOGIN"; payload: { email: string; userType: string } };
export type Dispatch = (action: Action) => void;
const reducer = (state: State, action: Action) => {
  if (action.type === "LOGIN") {
    return action.payload;
  }
  return state;
};

export default reducer;

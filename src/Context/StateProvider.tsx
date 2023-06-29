import { useContext, useReducer, createContext } from "react";
import reducer, { userInitialState } from "./Reducer";
import type { Dispatch, State } from "./Reducer";
import React from "react";

type ContextType = [State, Dispatch];
const UserContext = createContext<ContextType>([userInitialState, () => {}]);
// BUILD A PROVIDER
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useReducer(reducer, userInitialState);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// THIS IS HOW I WILL USE IT INSIDE OF A COMPONENT

export const userContext = () => useContext(UserContext);

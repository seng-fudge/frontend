import { createContext } from "react";

export const UserContext = createContext({
  createToken: null,
  setCreateToken: () => {},
  sendToken: null,
  setSendToken: () => {},
  email: null,
  setEmail: () => {},
  token: null,
  setToken: () => {},
});

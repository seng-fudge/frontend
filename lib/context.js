import { createContext } from "react";

export const UserContext = createContext({
  createToken: null,
  setCreateToken: null,
  sendToken: null,
  setSendToken: null,
  email: null,
  setEmail: null,
  password: null,
  setPassword: null,
});

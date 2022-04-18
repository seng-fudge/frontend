import { createContext } from "react";

export const UserContext = createContext({
  sendToken: null,
  setSendToken: () => {},
  email: null,
  setEmail: () => {},
  token: null,
  setToken: () => {},
  xml: null,
  setXml: () => {},
  customer: null,
  setCustomer: () => {},
  payment : null,
  setPayment: () => {},
  product: null,
  setProduct: () => {}
});

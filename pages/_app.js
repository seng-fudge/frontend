import { Toaster } from "react-hot-toast";
import { useState } from "react";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import jsCookie from "js-cookie";

function MyApp({ Component, pageProps }) {

  const [createToken, setCreateToken] = useState(loadCookie("createToken"));
  const [sendToken, setSendToken] = useState(loadCookie("sendToken"));
  const [email, setEmail] = useState(loadCookie("email"));
  const [token, setToken] = useState(loadCookie("token"));

  return (
    <UserContext.Provider
      value={{
        createToken,
        setCreateToken,
        sendToken,
        setSendToken,
        email,
        setEmail,
        token,
        setToken,
      }}
    >
      <NavBar />
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
  );
}

export default MyApp;

function loadCookie(name){
  let cookieValue = jsCookie.get(name)
  if (cookieValue){
    return cookieValue;
  }
  return null;
}
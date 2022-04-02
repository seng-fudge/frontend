import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import jsCookie from "js-cookie";

function MyApp({ Component, pageProps }) {

  const [createToken, setCreateToken] = useState(null);
  const [sendToken, setSendToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setCreateToken(loadCookie("createToken"));
    setSendToken(loadCookie("sendToken"));
    setEmail(loadCookie("email"));
    setToken(loadCookie("token"))
  }, []);

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
    console.log("Loading cookie");
    return cookieValue;
  }
  return null;
}
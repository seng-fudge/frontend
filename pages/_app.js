import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";
import jsCookie from "js-cookie";

function MyApp({ Component, pageProps }) {

  const [sendToken, setSendToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [xml, setXml] = useState(null);

  useEffect(() => {
    setSendToken(loadCookie("sendToken"));
    setEmail(loadCookie("email"));
    setToken(loadCookie("token"))
  }, []);

  return (
    <UserContext.Provider
      value={{
        sendToken,
        setSendToken,
        email,
        setEmail,
        token,
        setToken,
        xml,
        setXml
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
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import NavBar from "../components/navbar";
import { UserContext } from "../lib/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [createToken, setCreateToken] = useState(null);
  const [sendToken, setSendToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

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
